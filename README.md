https://img.shields.io/badge/React-18.2.0-blue
https://img.shields.io/badge/Node.js-Express-green
https://img.shields.io/badge/MongoDB-Mongoose-green
https://img.shields.io/badge/Styling-TailwindCSS-38B2AC
https://img.shields.io/badge/AI-ML_Integration-orange

A comprehensive web application designed to help aquarium hobbyists and fish breeders monitor fish health, detect early signs of diseases, and manage treatments through an intuitive interface with AI-powered disease prediction.

🐠 Features
Core Functionality
User Authentication - Secure JWT-based registration/login system

Fish Management - Complete CRUD operations for fish profiles with images

Health Tracking - Daily symptom logging and observation tracking

AI Disease Prediction - Machine learning-based symptom analysis

Treatment Management - Medication and treatment scheduling

Smart Notifications - Alert system for health issues and maintenance

Analytics Dashboard - Visual health trends and treatment effectiveness

Advanced Features
Multi-Aquarium Support - Manage multiple tanks with individual settings

Image Processing - Fish photo uploads and storage

Real-time Alerts - Priority-based notification system

Water Parameter Tracking - Monitor pH, ammonia, nitrite, nitrate levels

Mobile Responsive - Works perfectly on desktop, tablet, and mobile

🏗️ Tech Stack
Frontend
React 18 with Vite build tool

TailwindCSS for styling

React Router for navigation

React Hook Form for form handling

Axios for API communication

Lucide React for icons

Recharts for data visualization

Backend
Node.js with Express.js framework

MongoDB with Mongoose ODM

JWT for authentication

Multer for file uploads

BCrypt for password hashing

CORS enabled for cross-origin requests

AI/ML Integration
Python Flask microservice

Rule-based prediction engine (with ML readiness)

Disease classification based on symptom patterns

Confidence scoring and treatment recommendations

🚀 Quick Start
Prerequisites
Node.js 16+

MongoDB 5+

Python 3.8+ (for AI service)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/your-username/fish-health-tracking-system.git
cd fish-health-tracking-system
Setup Backend

bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
Setup Frontend

bash
cd frontend
npm install
cp .env.example .env
npm run dev
Setup AI Service (Optional)

bash
cd ai-model
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python server.py
Environment Variables
Backend (.env)

env
MONGODB_URI=mongodb://localhost:27017/fishhealth
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:5001
PORT=5000
Frontend (.env)

env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_AI_SERVICE_URL=http://localhost:5001
📁 Project Structure
text
fish-health-tracking-system/
├── backend/                 # Node.js Express API
│   ├── config/             # Database and service configurations
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth, validation, upload middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Helpers and utilities
│   └── server.js          # Main server file
├── frontend/               # React Vite application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── styles/        # Global styles
│   └── vite.config.js     # Vite configuration
├── ai-model/               # Python AI microservice
│   ├── app/               # Flask application
│   ├── notebooks/         # Jupyter notebooks for training
│   └── server.py          # AI service entry point
└── docs/                  # Documentation
🎯 Usage
Register/Login - Create an account with your experience level

Setup Aquarium - Add your aquarium details (size, type, water parameters)

Add Fish - Create fish profiles with species, age, and origin information

Log Health Checks - Record daily observations and symptoms

Receive AI Predictions - Get disease diagnoses and treatment recommendations

Manage Treatments - Track medications and water changes

Monitor Analytics - View health trends and treatment effectiveness

🤖 AI Disease Prediction
The system uses a hybrid approach:

Rule-based Engine - Immediate predictions based on symptom patterns

ML Ready Architecture - Prepared for trained model integration

Common Diseases Detected:

Ich (White Spot Disease)

Fin Rot

Dropsy

Velvet Disease

Swim Bladder Disorder

And 10+ other common fish diseases

🚀 Deployment
Backend Deployment (Heroku/Railway)
bash
# Set environment variables in your hosting platform
# Deploy from backend directory
Frontend Deployment (Vercel/Netlify)
bash
# Build command: npm run build
# Output directory: dist
# Set API environment variables
AI Service Deployment (Heroku/Railway)
bash
# Requires Python buildpack
# Set Flask environment variables
🧪 Testing
bash
# Backend tests
cd backend
npm test

# Frontend tests (coming soon)
cd frontend
npm test
🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support
📖 User Guide - Comprehensive usage instructions

📚 API Documentation - Complete API reference

🐛 Issue Tracker - Report bugs and request features

🙏 Acknowledgments
Icons by Lucide

UI components with TailwindCSS

Charting with Recharts

Built with Vite

Happy Fish Keeping! 🐟✨

For questions and support, please open an issue or contact the development team.

