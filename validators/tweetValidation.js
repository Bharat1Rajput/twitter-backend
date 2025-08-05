const { body, param } = require('express-validator');

// Tweet creation validation
const createTweetValidation = [
  body('content')
    .exists()
    .withMessage('Tweet content is required')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Tweet cannot be empty')
    .isLength({ max: 280 })
    .withMessage('Tweet cannot exceed 280 characters')
    .custom((value) => {
      // Check if tweet is only whitespace
      if (!value.replace(/\s/g, '').length) {
        throw new Error('Tweet cannot contain only whitespace');
      }
      return true;
    })
];

// Tweet like/unlike validation
const likeTweetValidation = [
  param('tweetId')
    .isMongoId()
    .withMessage('Invalid tweet ID format')
];

// Tweet delete validation
const deleteTweetValidation = [
  param('tweetId')
    .isMongoId()
    .withMessage('Invalid tweet ID format')
];

// Tweet reply validation (if you add replies later)
const replyTweetValidation = [
  param('tweetId')
    .isMongoId()
    .withMessage('Invalid tweet ID format'),
  body('content')
    .exists()
    .withMessage('Reply content is required')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Reply cannot be empty')
    .isLength({ max: 280 })
    .withMessage('Reply cannot exceed 280 characters')
];

// Get tweets validation (for pagination)
const getTweetsValidation = [
  // Optional query parameters
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  body('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

module.exports = {
  createTweetValidation,
  likeTweetValidation,
  deleteTweetValidation,
  replyTweetValidation,
  getTweetsValidation
};