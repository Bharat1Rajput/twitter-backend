const express = require('express');
const { createTweet, getTweets, likeTweet, deleteTweet } = require('../controller/tweetController');
const authenticate = require('../middleware/auth');
const handleValidationErrors = require('../middleware/validation');
const {
  createTweetValidation,
  likeTweetValidation,
  deleteTweetValidation,
  getTweetsValidation
} = require('../validators/tweetValidation');

const router = express.Router();

// Create tweet
router.post('/', authenticate, createTweetValidation, handleValidationErrors, createTweet);

// Get tweets
router.get('/', getTweetsValidation, handleValidationErrors, getTweets);

// Like/Unlike tweet
router.post('/:tweetId/like', authenticate, likeTweetValidation, handleValidationErrors, likeTweet);

// Delete tweet
router.delete('/:tweetId', authenticate, deleteTweetValidation, handleValidationErrors, deleteTweet);

module.exports = router;