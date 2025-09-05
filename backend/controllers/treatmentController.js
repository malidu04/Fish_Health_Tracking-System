// File: backend/controllers/treatmentController.js
const Treatment = require('../models/Treatment');
const Fish = require('../models/Fish');
const Aquarium = require('../models/Aquarium');
const Alert = require('../models/Alert');

// Get all treatments for a user
exports.getTreatments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { owner: req.user._id };
    if (status) query.status = status;
    
    const treatments = await Treatment.find(query)
      .populate('fish')
      .populate('aquarium')
      .sort({ startDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Treatment.countDocuments(query);
    
    res.json({
      treatments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get treatments error:', error);
    res.status(500).json({ message: 'Server error fetching treatments' });
  }
};

// Get a specific treatment
exports.getTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findOne({ 
      _id: req.params.id, 
      owner: req.user._id 
    })
    .populate('fish')
    .populate('aquarium');
    
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    
    res.json(treatment);
  } catch (error) {
    console.error('Get treatment error:', error);
    res.status(500).json({ message: 'Server error fetching treatment' });
  }
};

// Create a new treatment
exports.createTreatment = async (req, res) => {
  try {
    const { name, description, fish, aquarium, startDate, endDate, dosage, frequency, type, notes } = req.body;
    
    // Verify resources belong to user
    if (fish && fish.length > 0) {
      for (const fishId of fish) {
        const userFish = await Fish.findOne({ _id: fishId, owner: req.user._id });
        if (!userFish) {
          return res.status(404).json({ message: `Fish ${fishId} not found` });
        }
      }
    }
    
    if (aquarium) {
      const userAquarium = await Aquarium.findOne({ _id: aquarium, owner: req.user._id });
      if (!userAquarium) {
        return res.status(404).json({ message: 'Aquarium not found' });
      }
    }
    
    const treatment = new Treatment({
      name,
      description,
      fish,
      aquarium,
      startDate: startDate || Date.now(),
      endDate,
      dosage,
      frequency,
      type,
      notes,
      owner: req.user._id
    });
    
    await treatment.save();
    
    // Create reminder alert
    const alert = new Alert({
      title: `Treatment Started: ${name}`,
      message: `You've started a new treatment. Next dose: ${frequency}`,
      type: 'reminder',
      priority: 'medium',
      owner: req.user._id,
      relatedFish: fish,
      relatedAquarium: aquarium,
      actionRequired: true,
      expiryDate: endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default 1 week
    });
    await alert.save();
    
    res.status(201).json({
      message: 'Treatment created successfully',
      treatment
    });
  } catch (error) {
    console.error('Create treatment error:', error);
    res.status(500).json({ message: 'Server error creating treatment' });
  }
};

// Update a treatment
exports.updateTreatment = async (req, res) => {
  try {
    const { name, description, status, results, notes } = req.body;
    
    const treatment = await Treatment.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { name, description, status, results, notes },
      { new: true, runValidators: true }
    );
    
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    
    res.json({
      message: 'Treatment updated successfully',
      treatment
    });
  } catch (error) {
    console.error('Update treatment error:', error);
    res.status(500).json({ message: 'Server error updating treatment' });
  }
};

// Delete a treatment
exports.deleteTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    
    res.json({ message: 'Treatment deleted successfully' });
  } catch (error) {
    console.error('Delete treatment error:', error);
    res.status(500).json({ message: 'Server error deleting treatment' });
  }
};