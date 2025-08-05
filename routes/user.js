const express = require('express');
const { getUserProfile, followUser, getUserByUsername } = require('../controller/userController');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/profile', authenticate, getUserProfile);

// Get user by username
router.get('/:username', getUserByUsername);

// Follow/Unfollow user
router.post('/:userId/follow', authenticate, followUser);

module.exports = router;