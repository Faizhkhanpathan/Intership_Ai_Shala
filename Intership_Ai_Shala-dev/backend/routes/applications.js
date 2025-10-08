// routes/applications.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Internship = require('../models/Internship');
const { auth, isStudent, isCompany } = require('../middleware/auth');
const { sendEmail } = require('../utils/email');

// @route   POST /api/applications
// @desc    Apply for an internship
// @access  Private (Students only)
router.post('/', [auth, isStudent], async (req, res) => {
  try {
    const { internship, coverLetter, resume, answers } = req.body;

    // Check if internship exists and is active
    const internshipDoc = await Internship.findById(internship);
    if (!internshipDoc) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    if (internshipDoc.status !== 'active') {
      return res.status(400).json({ success: false, message: 'This internship is no longer accepting applications' });
    }

    // Check if application deadline has passed
    if (new Date() > internshipDoc.applicationDeadline) {
      return res.status(400).json({ success: false, message: 'Application deadline has passed' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      internship,
      applicant: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied to this internship' });
    }

    // Create application
    const application = new Application({
      internship,
      applicant: req.user.id,
      company: internshipDoc.company,
      coverLetter,
      resume,
      answers,
      timeline: [{
        status: 'pending',
        timestamp: new Date(),
        note: 'Application submitted'
      }]
    });

    await application.save();

    // Update internship applications count
    await internshipDoc.incrementApplications();

    // Send notification email to company
    const populatedApp = await Application.findById(application._id)
      .populate('applicant', 'name email')
      .populate('internship', 'title');

    await sendEmail({
      to: internshipDoc.company.email,
      subject: 'New Application Received',
      html: `
        <h2>New Application for ${populatedApp.internship.title}</h2>
        <p><strong>Applicant:</strong> ${populatedApp.applicant.name}</p>
        <p><strong>Email:</strong> ${populatedApp.applicant.email}</p>
        <p>Log in to your dashboard to review the application.</p>
      `
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/applications/my-applications
// @desc    Get user's applications
// @access  Private (Students only)
router.get('/my-applications', [auth, isStudent], async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { applicant: req.user.id };
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const applications = await Application.find(query)
      .populate('internship', 'title company location workMode type stipend startDate')
      .populate('company', 'name company.companyName company.logo')
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

// @route   GET /api/applications/company-applications
// @desc    Get applications for company's internships
// @access  Private (Company only)
router.get('/company-applications', [auth, isCompany], async (req, res) => {
  try {
    const { status, internship, page = 1, limit = 20 } = req.query;
    
    const query = { company: req.user.id };
    if (status) query.status = status;
    if (internship) query.internship = internship;

    const skip = (page - 1) * limit;

    const applications = await Application.find(query)
      .populate('applicant', 'name email profile student')
      .populate('internship', 'title type location')
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
    console.error('Get company applications error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('applicant', 'name email profile student')
      .populate('internship')
      .populate('company', 'name company.companyName');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Check authorization
    if (
      application.applicant._id.toString() !== req.user.id &&
      application.company._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, data: application });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private (Company only)
router.put('/:id/status', [auth, isCompany], async (req, res) => {
  try {
    const { status, feedback, interview } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('applicant', 'name email')
      .populate('internship', 'title');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Check ownership
    if (application.company.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    application.status = status;
    if (feedback) application.feedback = feedback;
    if (interview) application.interview = interview;

    await application.save();

    // Send notification email to applicant
    const statusMessages = {
      'reviewing': 'Your application is now under review',
      'shortlisted': 'Congratulations! You have been shortlisted',
      'interview-scheduled': 'An interview has been scheduled',
      'accepted': 'Congratulations! Your application has been accepted',
      'rejected': 'Unfortunately, your application was not selected this time'
    };

    await sendEmail({
      to: application.applicant.email,
      subject: `Application Update: ${application.internship.title}`,
      html: `
        <h2>Application Status Update</h2>
        <p>Dear ${application.applicant.name},</p>
        <p>${statusMessages[status]}</p>
        ${interview?.scheduledDate ? `<p><strong>Interview Date:</strong> ${new Date(interview.scheduledDate).toLocaleString()}</p>` : ''}
        ${interview?.link ? `<p><strong>Interview Link:</strong> ${interview.link}</p>` : ''}
        <p>Log in to your dashboard for more details.</p>
      `
    });

    res.json({
      success: true,
      message: 'Application status updated',
      data: application
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/applications/:id/withdraw
// @desc    Withdraw application
// @access  Private (Student only)
router.put('/:id/withdraw', [auth, isStudent], async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (['accepted', 'rejected', 'withdrawn'].includes(application.status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot withdraw application at this stage' 
      });
    }

    application.status = 'withdrawn';
    await application.save();

    res.json({
      success: true,
      message: 'Application withdrawn successfully'
    });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/applications/analytics/stats
// @desc    Get application statistics
// @access  Private (Company only)
router.get('/analytics/stats', [auth, isCompany], async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { company: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalApplications = await Application.countDocuments({ company: req.user.id });
    
    res.json({
      success: true,
      data: {
        total: totalApplications,
        byStatus: stats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;