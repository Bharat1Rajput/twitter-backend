const { param, query } = require('express-validator');

// Mark notification as read validation
const markAsReadValidation = [
  param('notificationId')
    .isMongoId()
    .withMessage('Invalid notification ID format')
];

// Get notifications validation (optional query params)
const getNotificationsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('showAll')
    .optional()
    .isBoolean()
    .withMessage('ShowAll filter must be a boolean')
];

module.exports = {
  markAsReadValidation,
  getNotificationsValidation
};
