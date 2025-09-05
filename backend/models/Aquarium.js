const mongoose = require('mongoose');

const aquariumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['freshwater', 'saltwater', 'brackish'],
    required: true
  },
  size: {
    type: Number,
    required: true,
    min: 1
  },
  unit: {
    type: String,
    enum: ['gallons', 'liters'],
    default: 'gallons'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fishCount: {
    type: Number,
    default: 0
  },
  waterParameters: {
    temperature: {
      type: Number,
      default: 0
    },
    pH: {
      type: Number,
      default: 0
    },
    ammonia: {
      type: Number,
      default: 0
    },
    nitrite: {
      type: Number,
      default: 0
    },
    nitrate: {
      type: Number,
      default: 0
    }
  },
  lastWaterChange: {
    type: Date,
    default: Date.now
  },
  waterChangeFrequency: {
    type: Number,
    default: 7
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Update fish count when fish are added/removed
aquariumSchema.methods.updateFishCount = async function() {
  const Fish = mongoose.model('Fish');
  const count = await Fish.countDocuments({ aquarium: this._id, isActive: true });
  this.fishCount = count;
  await this.save();
};

module.exports = mongoose.model('Aquarium', aquariumSchema);