// File: backend/routes/analytics.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

router.get('/health-trends', analyticsController.getHealthTrends);
router.get('/treatment-effectiveness', analyticsController.getTreatmentAnalytics);
router.get('/symptoms', analyticsController.getSymptomAnalytics);
router.get('/aquarium-summary', analyticsController.getAquariumHealthSummary);

module.exports = router;