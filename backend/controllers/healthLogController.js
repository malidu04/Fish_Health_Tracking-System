const HealthLog = require('../models/HealthLog');
const Fish = require('../models/Fish');
const Alert = require('../models/Alert');
const { predictDisease } = require('../utils/predictors');

// Get all health logs for a user
exports.getHealthLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, fish } = req.query;
    
    const query = { owner: req.user._id };
    if (fish) query.fish = fish;
    
    const healthLogs = await HealthLog.find(query)
      .populate('fish')
      .sort({ observationDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await HealthLog.countDocuments(query);
    
    res.json({
      healthLogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get health logs error:', error);
    res.status(500).json({ message: 'Server error fetching health logs' });
  }
};

// Get a specific health log
exports.getHealthLog = async (req, res) => {
  try {
    const healthLog = await HealthLog.findOne({ 
      _id: req.params.id, 
      owner: req.user._id 
    }).populate('fish');
    
    if (!healthLog) {
      return res.status(404).json({ message: 'Health log not found' });
    }
    
    res.json(healthLog);
  } catch (error) {
    console.error('Get health log error:', error);
    res.status(500).json({ message: 'Server error fetching health log' });
  }
};

// Create a new health log
exports.createHealthLog = async (req, res) => {
  try {
    const { fish, observationDate, symptoms, behavior, physical, waterParameters, notes } = req.body;
    
    // Verify fish belongs to user
    const userFish = await Fish.findOne({ 
      _id: fish, 
      owner: req.user._id 
    });
    
    if (!userFish) {
      return res.status(404).json({ message: 'Fish not found' });
    }
    
    const healthLog = new HealthLog({
      fish,
      observationDate: observationDate || Date.now(),
      symptoms: symptoms || {},
      behavior: behavior || {},
      physical: physical || {},
      waterParameters: waterParameters || {},
      notes,
      owner: req.user._id,
      images: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
    });
    
    // Get AI prediction if symptoms are present
    const hasSymptoms = symptoms && Object.values(symptoms).some(val => val === true);
    if (hasSymptoms) {
      try {
        const prediction = await predictDisease(symptoms);
        healthLog.aiPrediction = prediction;
        
        // Create alert for concerning symptoms
        if (prediction.confidence > 0.7) {
          const alert = new Alert({
            title: `Health Alert: ${prediction.disease} detected`,
            message: `Your fish ${userFish.name} is showing symptoms of ${prediction.disease}. ${prediction.recommendations.join(' ')}`,
            type: 'health',
            priority: 'high',
            owner: req.user._id,
            relatedFish: [fish],
            relatedAquarium: userFish.aquarium,
            actionRequired: true,
            data: { prediction }
          });
          await alert.save();
        }
      } catch (predictionError) {
        console.error('AI prediction error:', predictionError);
        // Continue without prediction if AI service fails
      }
    }
    
    await healthLog.save();
    
    // Update fish's last health check and status
    if (hasSymptoms) {
      userFish.status = 'sick';
    }
    userFish.lastHealthCheck = healthLog.observationDate;
    await userFish.save();
    
    res.status(201).json({
      message: 'Health log created successfully',
      healthLog
    });
  } catch (error) {
    console.error('Create health log error:', error);
    res.status(500).json({ message: 'Server error creating health log' });
  }
};

// Update a health log
exports.updateHealthLog = async (req, res) => {
  try {
    const { observationDate, symptoms, behavior, physical, waterParameters, notes } = req.body;
    
    const healthLog = await HealthLog.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { observationDate, symptoms, behavior, physical, waterParameters, notes },
      { new: true, runValidators: true }
    );
    
    if (!healthLog) {
      return res.status(404).json({ message: 'Health log not found' });
    }
    
    res.json({
      message: 'Health log updated successfully',
      healthLog
    });
  } catch (error) {
    console.error('Update health log error:', error);
    res.status(500).json({ message: 'Server error updating health log' });
  }
};

// Delete a health log
exports.deleteHealthLog = async (req, res) => {
  try {
    const healthLog = await HealthLog.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    
    if (!healthLog) {
      return res.status(404).json({ message: 'Health log not found' });
    }
    
    res.json({ message: 'Health log deleted successfully' });
  } catch (error) {
    console.error('Delete health log error:', error);
    res.status(500).json({ message: 'Server error deleting health log' });
  }
};