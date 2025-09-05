const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: 0
  },
  ageUnit: {
    type: String,
    enum: ['days', 'weeks', 'months', 'years'],
    default: 'months'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  origin: {
    type: String,
    enum: ['wild-caught', 'captive-bred', 'store-bought', 'unknown'],
    default: 'unknown'
  },
  aquarium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aquarium',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['healthy', 'sick', 'recovering', 'deceased'],
    default: 'healthy'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastHealthCheck: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update aquarium fish count when fish is saved
fishSchema.post('save', async function() {
  const Aquarium = mongoose.model('Aquarium');
  const aquarium = await Aquarium.findById(this.aquarium);
  if (aquarium) {
    await aquarium.updateFishCount();
  }
});

// Update aquarium fish count when fish is removed
fishSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const Aquarium = mongoose.model('Aquarium');
    const aquarium = await Aquarium.findById(doc.aquarium);
    if (aquarium) {
      await aquarium.updateFishCount();
    }
  }
});

module.exports = mongoose.model('Fish', fishSchema);