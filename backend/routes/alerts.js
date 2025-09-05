const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

router.get('/', alertController.getAlerts);
router.put('/:id/read', alertController.markAsRead);
router.put('/read-all', alertController.markAllAsRead);
router.delete('/:id', alertController.deleteAlert);

module.exports = router;