// models/Internship.js
const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['internship', 'freelance', 'full-time', 'part-time'],
    default: 'internship'
  },
  category: {
    type: String,
    required: true,
    enum: ['software-development', 'data-science', 'design', 'marketing', 'business', 'content-writing', 'finance', 'hr', 'other']
  },
  location: {
    type: String,
    required: true
  },
  workMode: {
    type: String,
    enum: ['remote', 'on-site', 'hybrid'],
    default: 'remote'
  },
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['weeks', 'months']
    }
  },
  stipend: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    isNegotiable: {
      type: Boolean,
      default: false
    },
    isPaid: {
      type: Boolean,
      default: true
    }
  },
  requirements: {
    skills: [String],
    education: String,
    experience: String,
    minGPA: Number
  },
  responsibilities: [String],
  perks: [String],
  openings: {
    type: Number,
    default: 1
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'closed', 'cancelled'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  questionnaire: [{
    question: String,
    type: {
      type: String,
      enum: ['text', 'paragraph', 'multiple-choice', 'file']
    },
    required: Boolean,
    options: [String]
  }]
}, {
  timestamps: true
});

// Index for search and filtering
internshipSchema.index({ title: 'text', description: 'text' });
internshipSchema.index({ category: 1, status: 1 });
internshipSchema.index({ location: 1, workMode: 1 });
internshipSchema.index({ createdAt: -1 });

// Update applications count
internshipSchema.methods.incrementApplications = async function() {
  this.applicationsCount += 1;
  await this.save();
};

module.exports = mongoose.model('Internship', internshipSchema);