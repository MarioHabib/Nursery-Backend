const { body, validationResult } = require('express-validator');

exports.validateTeacher = 
[
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('fullName').notEmpty().isString().trim().withMessage('Please provide a valid full name'),
  body('id').isNumeric().isLength({ min: 1}).withMessage('Please provide a valid ID'),
  body('image').isURL().withMessage('Please provide a valid URL'),
];
exports.validateChild = 
[
  body('fullName').notEmpty().isString().trim().withMessage('Please provide a valid full name'),
  body('level').notEmpty().isString().trim().withMessage('Please provide a valid level'),
  body('id').isNumeric().isLength({ min: 1}).withMessage('Please provide a valid ID'),
  body('age').isNumeric().isLength({ min: 1}).withMessage('Please provide a valid age'),
  body('class').isNumeric().isLength({ min: 1}).withMessage('Please provide a valid class'),
  body('address.city').notEmpty().isString(),
  body('address.street').notEmpty().isString(),
  body('address.building').notEmpty().isNumeric(),
];
exports.validateClass = 
[
  body('children').isArray({ min: 1 })
  .withMessage('children should be an array with at least one element')
  .custom((value) => {
    const isValid = Array.isArray(value) && value.every(Number.isFinite);
    if (!isValid) {
      throw new Error('Numbers should contain only valid numeric values');
    }
    return true;
  }),
  body('name').notEmpty().isString().trim().withMessage('Please provide a valid full name'),
  body('id').isNumeric().isLength({ min: 1}).withMessage('Please provide a valid ID'),
  body('supervisor').isNumeric().isLength({ min: 1}).withMessage('Please provide a valid supervisor ID')
  
];




