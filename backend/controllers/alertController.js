// File: backend/controllers/alertController.js
const Alert = require('../models/Alert');

// Get all alerts for a user
exports.getAlerts = async (req, res) => {
  try {
    const { page = 1, limit = 20, isRead, type } = req.query;
    
    const query = { owner: req.user._id };
    if (isRead !== undefined) query.isRead = isRead === 'true';
    if (type) query.type = type;
    
    const alerts = await Alert.find(query)
      .populate('relatedFish')
      .populate('relatedAquarium')
      .sort({ triggerDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Alert.countDocuments(query);
    const unreadCount = await Alert.countDocuments({ 
      owner: req.user._id, 
      isRead: false 
    });
    
    res.json({
      alerts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      unreadCount
    });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ message: 'Server error fetching alerts' });
  }
};

// Mark alert as read
exports.markAsRead = async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { isRead: true },
      { new: true }
    );
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    res.json({ message: 'Alert marked as read', alert });
  } catch (error) {
    console.error('Mark alert as read error:', error);
    res.status(500).json({ message: 'Server error updating alert' });
  }
};

// Mark all alerts as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Alert.updateMany(
      { owner: req.user._id, isRead: false },
      { isRead: true }
    );
    
    res.json({ message: 'All alerts marked as read' });
  } catch (error) {
    console.error('Mark all alerts as read error:', error);
    res.status(500).json({ message: 'Server error updating alerts' });
  }
};

// Delete an alert
exports.deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    res.json({ message: 'Alert deleted successfully' });
  } catch (error) {
    console.error('Delete alert error:', error);
    res.status(500).json({ message: 'Server error deleting alert' });
  }
};