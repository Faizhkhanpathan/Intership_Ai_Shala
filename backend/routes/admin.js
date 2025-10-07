// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Internship = require('../models/Internship');
const Application = require('../models/Application');
const { auth, isAdmin } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use([auth, isAdmin]);

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalCompanies,
      totalInternships,
      activeInternships,
      totalApplications,
      pendingApplications
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'company' }),
      Internship.countDocuments(),
      Internship.countDocuments({ status: 'active' }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' })
    ]);

    // Get recent users
    const recentUsers = await User.find()
      .select('-password')
      .sort('-createdAt')
      .limit(5);

    // Get application stats by status
    const applicationStats = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get internship stats by category
    const internshipStats = await Internship.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalStudents,
          totalCompanies,
          totalInternships,
          activeInternships,
          totalApplications,
          pendingApplications
        },
        recentUsers,
        applicationStats,
        internshipStats
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with filters
// @access  Private (Admin only)
router.get('/users', async (req, res) => {
  try {
    const { role, isActive, isVerified, search, page = 1, limit = 20 } = req.query;

    const query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (isVerified !== undefined) query.isVerified = isVerified === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select('-password')
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip(skip);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id/verify
// @desc    Verify user/company
// @access  Private (Admin only)
router.put('/users/:id/verify', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isVerified: true,
        'company.verified': true 
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User verified successfully',
      data: user
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id/toggle-active
// @desc    Activate/Deactivate user
// @access  Private (Admin only)
router.put('/users/:id/toggle-active', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: user
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user permanently
// @access  Private (Admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete related data
    if (user.role === 'company') {
      await Internship.deleteMany({ company: user._id });
      await Application.deleteMany({ company: user._id });
    } else if (user.role === 'student') {
      await Application.deleteMany({ applicant: user._id });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/internships
// @desc    Get all internships
// @access  Private (Admin only)
router.get('/internships', async (req, res) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;

    const skip = (page - 1) * limit;

    const internships = await Internship.find(query)
      .populate('company', 'name email company.companyName')
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Internship.countDocuments(query);

    res.json({
      success: true,
      data: internships,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get internships error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/admin/internships/:id/feature
// @desc    Feature/Unfeature internship
// @access  Private (Admin only)
router.put('/internships/:id/feature', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    internship.isFeatured = !internship.isFeatured;
    await internship.save();

    res.json({
      success: true,
      message: `Internship ${internship.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: internship
    });
  } catch (error) {
    console.error('Feature internship error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/admin/internships/:id
// @desc    Delete internship
// @access  Private (Admin only)
router.delete('/internships/:id', async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    // Delete related applications
    await Application.deleteMany({ internship: internship._id });

    res.json({ success: true, message: 'Internship deleted successfully' });
  } catch (error) {
    console.error('Delete internship error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/applications
// @desc    Get all applications
// @access  Private (Admin only)
router.get('/applications', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const applications = await Application.find(query)
      .populate('applicant', 'name email')
      .populate('company', 'name company.companyName')
      .populate('internship', 'title')
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Application.countDocuments(query);

    res.json({
      success: true,
      data: applications,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;