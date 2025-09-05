// File: backend/utils/notifications.js
const Alert = require('../models/Alert');
const { formatDate } = require('./helpers');

// Create water change reminder
exports.createWaterChangeReminder = async (aquarium, user) => {
  const nextChangeDate = new Date(aquarium.lastWaterChange);
  nextChangeDate.setDate(nextChangeDate.getDate() + aquarium.waterChangeFrequency);
  
  const alert = new Alert({
    title: `Water Change Due for ${aquarium.name}`,
    message: `It's time for a water change in ${aquarium.name}. Last change was on ${formatDate(aquarium.lastWaterChange)}.`,
    type: 'maintenance',
    priority: 'medium',
    owner: user._id,
    relatedAquarium: aquarium._id,
    actionRequired: true,
    triggerDate: nextChangeDate,
    expiryDate: new Date(nextChangeDate.getTime() + 2 * 24 * 60 * 60 * 1000) // 2 days after trigger
  });
  
  await alert.save();
};

// Create treatment reminder
exports.createTreatmentReminder = async (treatment, user) => {
  const alert = new Alert({
    title: `Treatment Reminder: ${treatment.name}`,
    message: `It's time for the next dose of ${treatment.name} for your fish.`,
    type: 'reminder',
    priority: 'medium',
    owner: user._id,
    relatedFish: treatment.fish,
    relatedAquarium: treatment.aquarium,
    actionRequired: true,
    data: { treatmentId: treatment._id }
  });
  
  await alert.save();
};

// Check and create scheduled alerts
exports.checkScheduledAlerts = async () => {
  try {
    // This would be called by a scheduled job (cron) to check for due alerts
    const now = new Date();
    
    // Find aquariums that need water change reminders
    const Aquarium = require('../models/Aquarium');
    const User = require('../models/User');
    
    const aquariums = await Aquarium.find().populate('owner');
    for (const aquarium of aquariums) {
      if (aquarium.owner.notificationsEnabled) {
        const nextChangeDate = new Date(aquarium.lastWaterChange);
        nextChangeDate.setDate(nextChangeDate.getDate() + aquarium.waterChangeFrequency);
        
        if (now >= nextChangeDate) {
          // Check if alert already exists
          const existingAlert = await Alert.findOne({
            relatedAquarium: aquarium._id,
            type: 'maintenance',
            isRead: false
          });
          
          if (!existingAlert) {
            await exports.createWaterChangeReminder(aquarium, aquarium.owner);
          }
        }
      }
    }
    
    console.log('Scheduled alert check completed');
  } catch (error) {
    console.error('Error in scheduled alert check:', error);
  }
};