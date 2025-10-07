// utils/email.js
const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Send email function
exports.sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Email could not be sent');
  }
};

// Email templates
exports.templates = {
  welcome: (name) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4F46E5;">Welcome to Internship Allocation!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining our platform. We're excited to help you in your internship journey.</p>
      <p>Get started by completing your profile and exploring available opportunities.</p>
      <p>Best regards,<br>The Internship Allocation Team</p>
    </div>
  `,

  applicationReceived: (companyName, internshipTitle, applicantName) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">New Application Received</h2>
      <p>Hi ${companyName},</p>
      <p>You have received a new application for <strong>${internshipTitle}</strong></p>
      <p><strong>Applicant:</strong> ${applicantName}</p>
      <p>Please log in to your dashboard to review the application.</p>
      <p>Best regards,<br>The Internship Allocation Team</p>
    </div>
  `,

  applicationStatusUpdate: (studentName, internshipTitle, status) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Application Status Update</h2>
      <p>Hi ${studentName},</p>
      <p>Your application for <strong>${internshipTitle}</strong> has been updated.</p>
      <p><strong>New Status:</strong> ${status}</p>
      <p>Log in to your dashboard for more details.</p>
      <p>Best regards,<br>The Internship Allocation Team</p>
    </div>
  `
};