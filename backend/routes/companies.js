// routes/companies.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Internship = require('../models/Internship');

// @route   GET /api/companies
// @desc    Get all companies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { industry, verified, search, page = 1, limit = 10 } = req.query;

    const query = { 
      role: 'company',
      isActive: true
    };

    if (industry) {
      query['company.industry'] = industry;
    }

    if (verified !== undefined) {
      query['company.verified'] = verified === 'true';
    }

    if (search) {
      query.$or = [
        { 'company.companyName': { $regex: search, $options: 'i' } },
        { 'company.description': { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const companies = await User.find(query)
      .select('name email company createdAt')
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip(skip);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: companies,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/companies/:id
// @desc    Get company profile
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const company = await User.findOne({
      _id: req.params.id,
      role: 'company'
    }).select('-password');

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    // Get company's active internships
    const internships = await Internship.find({
      company: company._id,
      status: 'active'
    }).select('title type location workMode stipend startDate');

    res.json({
      success: true,
      data: {
        company,
        internships
      }
    });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/companies/:id/internships
// @desc    Get all internships by company
// @access  Public
router.get('/:id/internships', async (req, res) => {
  try {
    const { status = 'active', page = 1, limit = 10 } = req.query;

    const query = {
      company: req.params.id,
      status
    };

    const skip = (page - 1) * limit;

    const internships = await Internship.find(query)
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
    console.error('Get company internships error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/companies/featured/list
// @desc    Get featured/verified companies
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const companies = await User.find({
      role: 'company',
      'company.verified': true,
      isActive: true
    })
      .select('name email company')
      .limit(12)
      .sort('-createdAt');

    res.json({ success: true, data: companies });
  } catch (error) {
    console.error('Get featured companies error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;