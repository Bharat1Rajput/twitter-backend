const User = require('../models/user');
const Tweet = require('../models/tweet');

// Search users
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: 'i' } },
        { displayName: { $regex: q, $options: 'i' } }
      ]
    })
    .select('username displayName bio profilePicture followersCount')
    .limit(20);

    res.json({ users, query: q });
  } catch (error) {
    res.status(500).json({ error: 'Error searching users' });
  }
};

// Search tweets
const searchTweets = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const skip = (page - 1) * limit;

    const tweets = await Tweet.find({
      content: { $regex: q, $options: 'i' }
    })
    .populate('author', 'username displayName profilePicture')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    res.json({ tweets, query: q, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ error: 'Error searching tweets' });
  }
};

module.exports = { searchUsers, searchTweets };