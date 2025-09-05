const express = require('express');
const router = express.Router();
const healthLogController = require('../controllers/healthLogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateHealthLog, checkValidationResult } = require('../middleware/validation');

// All routes are protected
router.use(auth);

router.get('/', healthLogController.getHealthLogs);
router.get('/:id', healthLogController.getHealthLog);
router.post('/', upload.array('images', 5), validateHealthLog, checkValidationResult, healthLogController.createHealthLog);
router.put('/:id', healthLogController.updateHealthLog);
router.delete('/:id', healthLogController.deleteHealthLog);

module.exports = router;