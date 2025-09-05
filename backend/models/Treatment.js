const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxLength: 500
    },
    fish: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fish'
    }],
    aquarium: {
        type: String,
        ref: 'Aquarium'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  dosage: String,
  frequency: String,
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'cancelled'],
    default: 'planned'
  },
  type: {
    type: String,
    enum: ['medication', 'water-change', 'salt-bath', 'quarantine', 'diet-change', 'other'],
    default: 'medication'
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  results: {
    type: String,
    enum: ['effective', 'ineffective', 'partial', 'unknown'],
    default: 'unknown'
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Treatment', treatmentSchema);