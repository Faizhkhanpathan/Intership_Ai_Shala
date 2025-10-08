Internship Allocation Platform - Backend API
Complete backend system for an internship and freelancing platform built with Node.js, Express, and MongoDB.

Features
User Authentication: JWT-based authentication with role-based access control (Student, Company, Admin)
User Management: Profile management, password reset, email verification
Internship Management: CRUD operations for internships with advanced filtering
Application System: Apply for internships, track application status, interview scheduling
Freelance Projects: Separate module for freelance opportunities
Company Profiles: Company listings and verification system
Admin Dashboard: Complete admin panel with analytics and user management
Email Notifications: Automated emails for applications, status updates, and more
File Uploads: Resume and avatar upload functionality
Search & Filters: Advanced search with multiple filter options
Rate Limiting: Protection against abuse
Security: Helmet, CORS, password hashing, input validation
Tech Stack
Node.js - Runtime environment
Express.js - Web framework
MongoDB - Database
Mongoose - ODM for MongoDB
JWT - Authentication
Bcrypt - Password hashing
Nodemailer - Email sending
Multer - File uploads
Helmet - Security headers
Express Rate Limit - Rate limiting
Installation
Prerequisites
Node.js (v14 or higher)
MongoDB (v4.4 or higher)
npm or yarn
Steps
Clone the repository
bash
git clone <your-repo-url>
cd internship-allocation-backend
Install dependencies
bash
npm install
Configure environment variables
Create a .env file in the root directory and copy contents from .env.example:

bash
cp .env.example .env
Update the following variables:

MONGODB_URI: Your MongoDB connection string
JWT_SECRET: A secure random string for JWT
SMTP_*: Your email service credentials
FRONTEND_URL: Your frontend application URL
Start MongoDB
Make sure MongoDB is running on your system:

bash
mongod
Run the server
Development mode:

bash
npm run dev
Production mode:

bash
npm start
The server will start on http://localhost:5000

Project Structure
├── server.js                 # Main application entry point
├── models/
│   ├── User.js              # User model (students, companies, admin)
│   ├── Internship.js        # Internship/Freelance model
│   └── Application.js       # Application model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User profile routes
│   ├── internships.js       # Internship CRUD routes
│   ├── applications.js      # Application management routes
│   ├── companies.js         # Company listing routes
│   ├── freelance.js         # Freelance project routes
│   └── admin.js             # Admin panel routes
├── middleware/
│   └── auth.js              # Authentication middleware
├── utils/
│   ├── email.js             # Email utility functions
│   └── upload.js            # File upload configuration
├── uploads/                 # Uploaded files directory
├── .env.example             # Environment variables template
├── package.json             # Dependencies
└── README.md               # Documentation
API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
GET /api/auth/verify-email/:token - Verify email
POST /api/auth/forgot-password - Request password reset
POST /api/auth/reset-password - Reset password
Users
GET /api/users/me - Get current user profile
PUT /api/users/me - Update profile
PUT /api/users/change-password - Change password
POST /api/users/upload-avatar - Upload avatar
POST /api/users/upload-resume - Upload resume
GET /api/users/:id - Get user by ID
Internships
GET /api/internships - Get all internships (with filters)
GET /api/internships/:id - Get single internship
POST /api/internships - Create internship (Company only)
PUT /api/internships/:id - Update internship
DELETE /api/internships/:id - Delete internship
GET /api/internships/company/my-posts - Get company's internships
GET /api/internships/featured/list - Get featured internships
Applications
POST /api/applications - Apply for internship (Student only)
GET /api/applications/my-applications - Get user's applications
GET /api/applications/company-applications - Get company's received applications
GET /api/applications/:id - Get single application
PUT /api/applications/:id/status - Update application status (Company)
PUT /api/applications/:id/withdraw - Withdraw application (Student)
GET /api/applications/analytics/stats - Get application statistics
Companies
GET /api/companies - Get all companies
GET /api/companies/:id - Get company profile
GET /api/companies/:id/internships - Get company's internships
GET /api/companies/featured/list - Get featured companies
Freelance
GET /api/freelance - Get all freelance projects
GET /api/freelance/:id - Get single project
GET /api/freelance/categories/list - Get categories with counts
Admin
GET /api/admin/dashboard - Get dashboard statistics
GET /api/admin/users - Get all users
PUT /api/admin/users/:id/verify - Verify user/company
PUT /api/admin/users/:id/toggle-active - Activate/deactivate user
DELETE /api/admin/users/:id - Delete user
GET /api/admin/internships - Get all internships
PUT /api/admin/internships/:id/feature - Feature/unfeature internship
DELETE /api/admin/internships/:id - Delete internship
GET /api/admin/applications - Get all applications
User Roles
Student
Create and manage profile
Browse internships and freelance projects
Apply for opportunities
Track application status
Upload resume and portfolio
Company
Create company profile
Post internships and freelance projects
Manage applications
Schedule interviews
Update application statuses
Admin
Full system access
Verify companies
Feature internships
Manage users and content
View analytics
Environment Variables
Required environment variables (see .env.example):

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/internship-allocation
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
FROM_NAME=Internship Allocation
FROM_EMAIL=noreply@example.com
Security Features
Password hashing with bcrypt
JWT authentication
Input validation
Rate limiting
CORS protection
Helmet security headers
Role-based access control
Testing
Run tests:

bash
npm test
Deployment
Deploy to Heroku
Create a Heroku app
Add MongoDB addon (mLab/MongoDB Atlas)
Set environment variables
Push to Heroku
bash
heroku create your-app-name
heroku addons:create mongolab
heroku config:set JWT_SECRET=your_secret
git push heroku main
Deploy to DigitalOcean/AWS
Set up a server with Node.js and MongoDB
Clone repository
Install dependencies
Configure environment variables
Use PM2 for process management
bash
npm install -g pm2
pm2 start server.js --name internship-api
pm2 startup
pm2 save
Contributing
Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request
License
MIT License - feel free to use this project for learning or commercial purposes.

Support
For issues and questions, please open an issue on GitHub or contact support.

Author
Your Name - [Your Email]

Acknowledgments
Express.js team
MongoDB team
All contributors
