const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://malidupahasara04_db_user:pahasara12#A@cluster0.jlvz9an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
             useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error:`, error.message);
        process.exit(1);
    }
};

module.exports = connectDB;