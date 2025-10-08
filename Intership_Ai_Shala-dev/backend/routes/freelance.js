// routes/freelance.js
const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const { auth } = require('../middleware/auth');

// @route   GET /api/freelance
// @desc    Get all freelance projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      minBudget,
      maxBudget,
      skills,
      page = 1,
      limit = 10
    } = req.query;

    const query = {
      type: 'freelance',
      status: 'active'
    };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (minBudget || maxBudget) {
      query['stipend.min'] = {};
      if (minBudget) query['stipend.min'].$gte = parseInt(minBudget);
      if (maxBudget) query['stipend.max'] = { $lte: parseInt(maxBudget) };
    }

    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      query['requirements.skills'] = { $in: skillsArray };
    }

    const skip = (page - 1) * limit;

    const projects = await Internship.find(query)
      .populate('company', 'name company.companyName company.logo')
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Internship.countDocuments(query);

    res.json({
      success: true,
      data: projects,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get freelance projects error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/freelance/:id
// @desc    Get single freelance project
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Internship.findOne({
      _id: req.params.id,
      type: 'freelance'
    }).populate('company', 'name email company');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Increment views
    project.views += 1;
    await project.save();

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Get freelance project error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/freelance/categories/list
// @desc    Get freelance categories with count
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Internship.aggregate([
      { $match: { type: 'freelance', status: 'active' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;