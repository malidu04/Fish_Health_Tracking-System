const { body, validationResult } = require('express-validator');

const validateRegistration = [
    body('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 character long'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

const validateFish = [
    body('species')
        .trim()
        .notEmpty()
        .withMessage('Species is required'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    body('aquarium')
        .isMongoId()
        .withMessage('Valid aquarium ID is required'),
];

const validateHealthLog = [
    body('fish')
        .isMongoId()
        .withMessage('Valid fish ID is required'),
    body('observationDate')
        .isISO8601()
        .withMessage('Valid date is required'),
];

const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation Failed',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateRegistration,
    validateHealthLog,
    checkValidationResult,
    validateFish
};