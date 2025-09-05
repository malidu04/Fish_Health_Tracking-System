const HealthLog = require('../models/HealthLog');
const Fish = require('../models/Fish');
const Treatment = require('../models/Treatment');
const Aquarium = require('../models/Aquarium');

// Get health trends for a user
exports.getHealthTrends = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    const healthLogs = await HealthLog.find({
      owner: req.user._id,
      observationDate: { $gte: startDate }
    }).populate('fish');
    
    // Group by date and calculate health scores
    const trends = healthLogs.reduce((acc, log) => {
      const date = log.observationDate.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, healthy: 0, sick: 0, total: 0 };
      }
      
      const hasSymptoms = log.symptoms && Object.values(log.symptoms).some(val => val === true);
      if (hasSymptoms) {
        acc[date].sick++;
      } else {
        acc[date].healthy++;
      }
      acc[date].total++;
      
      return acc;
    }, {});
    
    res.json(Object.values(trends));
  } catch (error) {
    console.error('Get health trends error:', error);
    res.status(500).json({ message: 'Server error fetching health trends' });
  }
};

// Get treatment effectiveness analytics
exports.getTreatmentAnalytics = async (req, res) => {
  try {
    const treatments = await Treatment.find({
      owner: req.user._id,
      status: 'completed',
      results: { $ne: 'unknown' }
    });
    
    const effectiveness = treatments.reduce((acc, treatment) => {
      if (!acc[treatment.name]) {
        acc[treatment.name] = { effective: 0, ineffective: 0, partial: 0, total: 0 };
      }
      
      acc[treatment.name][treatment.results]++;
      acc[treatment.name].total++;
      
      return acc;
    }, {});
    
    res.json(effectiveness);
  } catch (error) {
    console.error('Get treatment analytics error:', error);
    res.status(500).json({ message: 'Server error fetching treatment analytics' });
  }
};

// Get common symptoms analytics
exports.getSymptomAnalytics = async (req, res) => {
  try {
    const { days = 90 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    const healthLogs = await HealthLog.find({
      owner: req.user._id,
      observationDate: { $gte: startDate }
    });
    
    const symptoms = healthLogs.reduce((acc, log) => {
      if (log.symptoms) {
        Object.entries(log.symptoms).forEach(([symptom, present]) => {
          if (present) {
            acc[symptom] = (acc[symptom] || 0) + 1;
          }
        });
      }
      return acc;
    }, {});
    
    res.json(symptoms);
  } catch (error) {
    console.error('Get symptom analytics error:', error);
    res.status(500).json({ message: 'Server error fetching symptom analytics' });
  }
};

// Get aquarium health summary
exports.getAquariumHealthSummary = async (req, res) => {
  try {
    const aquariums = await Aquarium.find({ owner: req.user._id });
    
    const summary = await Promise.all(aquariums.map(async (aquarium) => {
      const fish = await Fish.find({ aquarium: aquarium._id, isActive: true });
      const healthyFish = fish.filter(f => f.status === 'healthy').length;
      const sickFish = fish.filter(f => f.status === 'sick').length;
      const recoveringFish = fish.filter(f => f.status === 'recovering').length;
      
      return {
        aquarium: aquarium.name,
        totalFish: fish.length,
        healthyFish,
        sickFish,
        recoveringFish,
        healthPercentage: fish.length > 0 ? Math.round((healthyFish / fish.length) * 100) : 0
      };
    }));
    
    res.json(summary);
  } catch (error) {
    console.error('Get aquarium health summary error:', error);
    res.status(500).json({ message: 'Server error fetching aquarium health summary' });
  }
};