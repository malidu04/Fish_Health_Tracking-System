const Fish = require('../models/Fish');
const Aquarium = require('../models/Aquarium');
const HealthLog = require('../models/HealthLog');

// Get all fish for a user
exports.getUserFish = async (req, res) => {
  try {
    const fish = await Fish.find({ owner: req.user._id, isActive: true })
      .populate('aquarium')
      .sort({ createdAt: -1 });
    
    res.json(fish);
  } catch (error) {
    console.error('Get fish error:', error);
    res.status(500).json({ message: 'Server error fetching fish' });
  }
};

// Get a specific fish
exports.getFish = async (req, res) => {
  try {
    const fish = await Fish.findOne({ 
      _id: req.params.id, 
      owner: req.user._id 
    }).populate('aquarium');
    
    if (!fish) {
      return res.status(404).json({ message: 'Fish not found' });
    }
    
    res.json(fish);
  } catch (error) {
    console.error('Get fish error:', error);
    res.status(500).json({ message: 'Server error fetching fish' });
  }
};

// Create a new fish
exports.createFish = async (req, res) => {
  try {
    const { name, species, breed, age, ageUnit, aquarium, origin } = req.body;
    
    // Verify aquarium belongs to user
    const userAquarium = await Aquarium.findOne({ 
      _id: aquarium, 
      owner: req.user._id 
    });
    
    if (!userAquarium) {
      return res.status(404).json({ message: 'Aquarium not found' });
    }
    
    const fish = new Fish({
      name,
      species,
      breed,
      age,
      ageUnit,
      aquarium,
      origin,
      owner: req.user._id,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });
    
    await fish.save();
    
    res.status(201).json({
      message: 'Fish created successfully',
      fish
    });
  } catch (error) {
    console.error('Create fish error:', error);
    res.status(500).json({ message: 'Server error creating fish' });
  }
};

// Update a fish
exports.updateFish = async (req, res) => {
  try {
    const { name, species, breed, age, ageUnit, status } = req.body;
    
    const fish = await Fish.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { name, species, breed, age, ageUnit, status },
      { new: true, runValidators: true }
    );
    
    if (!fish) {
      return res.status(404).json({ message: 'Fish not found' });
    }
    
    res.json({
      message: 'Fish updated successfully',
      fish
    });
  } catch (error) {
    console.error('Update fish error:', error);
    res.status(500).json({ message: 'Server error updating fish' });
  }
};

// Delete a fish (soft delete)
exports.deleteFish = async (req, res) => {
  try {
    const fish = await Fish.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { isActive: false },
      { new: true }
    );
    
    if (!fish) {
      return res.status(404).json({ message: 'Fish not found' });
    }
    
    res.json({ message: 'Fish deleted successfully' });
  } catch (error) {
    console.error('Delete fish error:', error);
    res.status(500).json({ message: 'Server error deleting fish' });
  }
};

// Get fish health history
exports.getFishHealthHistory = async (req, res) => {
  try {
    const healthLogs = await HealthLog.find({ 
      fish: req.params.id, 
      owner: req.user._id 
    }).sort({ observationDate: -1 });
    
    res.json(healthLogs);
  } catch (error) {
    console.error('Get health history error:', error);
    res.status(500).json({ message: 'Server error fetching health history' });
  }
};