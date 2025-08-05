const express = require('express');
const { searchUsers, searchTweets } = require('../controller/searchController');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Search users
router.get('/user', authenticate, searchUsers);

// Search tweets  
router.get('/tweet', authenticate, searchTweets);

module.exports = router;