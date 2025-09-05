const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // ✅ use bcryptjs instead of bcrypt

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // ✅ fixed typo
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    experienceLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'expert'], // ✅ fixed typo
        default: 'beginner'
    },
    aquariums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aquarium'
    }],
    notificationsEnabled: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// 🔑 Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // bcryptjs supports async
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// 🔑 Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
