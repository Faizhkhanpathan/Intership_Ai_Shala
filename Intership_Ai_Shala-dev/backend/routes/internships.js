// routes/internships.js
const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const { auth, isCompany } = require('../middleware/auth');

// @route   GET /api/internships
// @desc    Get all internships with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      location,
      workMode,
      type,
      minStipend,
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    const query = { status: 'active' };

    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Work mode filter
    if (workMode) {
      query.workMode = workMode;
    }

    // Type filter
    if (type) {
      query.type = type;
    }

    // Minimum stipend filter
    if (minStipend) {
      query['stipend.min'] = { $gte: parseInt(minStipend) };
    }

    const skip = (page - 1) * limit;

    const internships = await Internship.find(query)
      .populate('company', 'name email company.companyName company.logo company.industry')
      .sort(sort)
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

// @route   GET /api/internships/:id
// @desc    Get single internship by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('company', 'name email company.companyName company.logo company.industry company.description company.website');

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    // Increment views
    internship.views += 1;
    await internship.save();

    res.json({ success: true, data: internship });
  } catch (error) {
    console.error('Get internship error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/internships
// @desc    Create a new internship
// @access  Private (Company only)
router.post('/', [auth, isCompany], async (req, res) => {
  try {
    const internshipData = {
      ...req.body,
      company: req.user.id
    };

    const internship = new Internship(internshipData);
    await internship.save();

    res.status(201).json({
      success: true,
      message: 'Internship created successfully',
      data: internship
    });
  } catch (error) {
    console.error('Create internship error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/internships/:id
// @desc    Update internship
// @access  Private (Company owner only)
router.put('/:id', [auth, isCompany], async (req, res) => {
  try {
    let internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    // Check ownership
    if (internship.company.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Internship updated successfully',
      data: internship
    });
  } catch (error) {
    console.error('Update internship error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/internships/:id
// @desc    Delete internship
// @access  Private (Company owner only)
router.delete('/:id', [auth, isCompany], async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    // Check ownership
    if (internship.company.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await internship.deleteOne();

    res.json({ success: true, message: 'Internship deleted successfully' });
  } catch (error) {
    console.error('Delete internship error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/internships/company/my-posts
// @desc    Get company's posted internships
// @access  Private (Company only)
router.get('/company/my-posts', [auth, isCompany], async (req, res) => {
  try {
    const internships = await Internship.find({ company: req.user.id })
      .sort('-createdAt');

    res.json({ success: true, data: internships });
  } catch (error) {
    console.error('Get company internships error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/internships/featured/list
// @desc    Get featured internships
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const internships = await Internship.find({ 
      status: 'active', 
      isFeatured: true 
    })
      .populate('company', 'name company.companyName company.logo')
      .limit(10)
      .sort('-createdAt');

    res.json({ success: true, data: internships });
  } catch (error) {
    console.error('Get featured internships error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;