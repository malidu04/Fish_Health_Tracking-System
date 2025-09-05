// File: backend/models/HealthLog.js
const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  fish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fish',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  observationDate: {
    type: Date,
    default: Date.now
  },
  // Symptoms tracking
  symptoms: {
    whiteSpots: { type: Boolean, default: false },
    finRot: { type: Boolean, default: false },
    clampedFins: { type: Boolean, default: false },
    lossOfAppetite: { type: Boolean, default: false },
    lethargy: { type: Boolean, default: false },
    rapidBreathing: { type: Boolean, default: false },
    bloating: { type: Boolean, default: false },
    lesions: { type: Boolean, default: false },
    cloudyEyes: { type: Boolean, default: false },
    abnormalSwimming: { type: Boolean, default: false }
  },
  // Behavioral observations
  behavior: {
    appetite: {
      type: String,
      enum: ['normal', 'reduced', 'none'],
      default: 'normal'
    },
    activity: {
      type: String,
      enum: ['normal', 'lethargic', 'hyperactive'],
      default: 'normal'
    },
    social: {
      type: String,
      enum: ['normal', 'aggressive', 'withdrawn'],
      default: 'normal'
    }
  },
  // Physical observations
  physical: {
    bodyColor: { type: String, default: 'normal' },
    finCondition: { type: String, default: 'normal' },
    eyeClarity: { type: String, default: 'clear' },
    bodyShape: { type: String, default: 'normal' }
  },
  waterParameters: {
    temperature: Number,
    pH: Number,
    ammonia: Number,
    nitrite: Number,
    nitrate: Number
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  // AI prediction fields
  aiPrediction: {
    disease: String,
    confidence: Number,
    recommendations: [String]
  },
  images: [String]
}, {
  timestamps: true
});

// Index for efficient querying
healthLogSchema.index({ fish: 1, observationDate: -1 });
healthLogSchema.index({ owner: 1, observationDate: -1 });

module.exports = mongoose.model('HealthLog', healthLogSchema);