const express = require('express');
const { getUserProfile, updateUserProfile, followUser, getUserByUsername,getUserFollowers,getUserFollowing } = require('../controller/userController');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/profile', authenticate, getUserProfile);
// Update user profile
router.put('/profile', authenticate, updateUserProfile);

// Get user by username
router.get('/:username', getUserByUsername);


// Follow/Unfollow user
router.post('/:userId/follow', authenticate, followUser);

// Get user followers
router.get('/:userId/followers', authenticate, getUserFollowers);

// Get user following
router.get('/:userId/following', authenticate, getUserFollowing);

module.exports = router;