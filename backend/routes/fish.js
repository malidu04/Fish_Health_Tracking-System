const express = require('express');
const router = express.Router();
const fishController = require('../controllers/fishController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateFish, checkValidationResult } = require('../middleware/validation');

// All routes are protected
router.use(auth);

router.get('/', fishController.getUserFish);
router.get('/:id', fishController.getFish);
router.get('/:id/health', fishController.getFishHealthHistory);
router.post('/', upload.single('image'), validateFish, checkValidationResult, fishController.createFish);
router.put('/:id', fishController.updateFish);
router.delete('/:id', fishController.deleteFish);

module.exports = router;