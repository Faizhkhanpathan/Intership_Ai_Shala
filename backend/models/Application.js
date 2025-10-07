// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'interview-scheduled', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  resume: {
    type: String,
    required: true
  },
  answers: [{
    question: String,
    answer: mongoose.Schema.Types.Mixed
  }],
  interview: {
    scheduledDate: Date,
    mode: {
      type: String,
      enum: ['video', 'phone', 'in-person']
    },
    link: String,
    notes: String
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    strengths: [String],
    improvements: [String]
  },
  timeline: [{
    status: String,
    timestamp: Date,
    note: String
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate applications
applicationSchema.index({ internship: 1, applicant: 1 }, { unique: true });
applicationSchema.index({ company: 1, status: 1 });
applicationSchema.index({ applicant: 1, status: 1 });

// Add status to timeline before save
applicationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.timeline.push({
      status: this.status,
      timestamp: new Date(),
      note: `Status changed to ${this.status}`
    });
  }
  next();
});

module.exports = mongoose.model('Application', applicationSchema);