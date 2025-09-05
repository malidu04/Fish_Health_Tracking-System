const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['health', 'maintenance', 'system', 'reminder'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relatedFish: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fish'
  }],
  relatedAquarium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aquarium'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  actionRequired: {
    type: Boolean,
    default: false
  },
  actionTaken: {
    type: Boolean,
    default: false
  },
  triggerDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: Date,
  data: mongoose.Schema.Types.Mixed // Additional data specific to the alert type
}, {
  timestamps: true
});

// Index for efficient querying
alertSchema.index({ owner: 1, isRead: 1, triggerDate: -1 });

module.exports = mongoose.model('Alert', alertSchema);