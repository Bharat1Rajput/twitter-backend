const express = require('express');
const { createTweet, getTweets, likeTweet, deleteTweet,getPersonalizedTimeline,getUserTweets,getTweetAnalytics } = require('../controller/tweetController');
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

// get personalized timeline
router.get('/timeline', authenticate, getPersonalizedTimeline);

// Get user tweets  
router.get('/:userId', authenticate, getUserTweets);

// Get tweet analytics
router.get('/:tweetId/analytics', authenticate, getTweetAnalytics);


module.exports = router;