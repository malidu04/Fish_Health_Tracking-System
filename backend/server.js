// File: backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const fishRoutes = require('./routes/fish');
const healthLogsRoutes = require('./routes/healthLogs');
const treatmentsRoutes = require('./routes/treatments');
const alertsRoutes = require('./routes/alerts');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // For serving uploaded images

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://malidupahasara04_db_user:pahasara12@cluster0.jlvz9an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/fish', fishRoutes);
app.use('/api/health', healthLogsRoutes);
app.use('/api/treatments', treatmentsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/analytics', analyticsRoutes);

// Basic route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'Fish Health Tracking API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong! ' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});