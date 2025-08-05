const Tweet = require('../models/tweet');
const User = require('../models/user');

// Create tweet
const createTweet = async (req, res) => {
  try {
    const { content } = req.body;
    
    const tweet = new Tweet({
      author: req.user._id,
      content
    });

    await tweet.save();
    await tweet.populate('author', 'username displayName');
    

    res.status(201).json({
      message: 'Tweet created successfully',
      tweet
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating tweet' });
  }
};

// Get all tweets (timeline)
const getTweets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tweets = await Tweet.find()
      .populate('author', 'username displayName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ tweets, page, limit });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tweets' });
  }
};

// Like tweet
const likeTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.user._id;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    const isLiked = tweet.likes.includes(userId);

    if (isLiked) {
      tweet.likes.pull(userId);
      tweet.likesCount -= 1;
    } else {
      tweet.likes.push(userId);
      tweet.likesCount += 1;
    }

    await tweet.save();
    res.json({ message: isLiked ? 'Tweet unliked' : 'Tweet liked', likesCount: tweet.likesCount });
  } catch (error) {
    res.status(500).json({ error: 'Error liking tweet' });
  }
};

// Delete tweet
const deleteTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.user._id;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    if (tweet.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this tweet' });
    }

    await Tweet.findByIdAndDelete(tweetId);
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting tweet' });
  }
};

module.exports = { createTweet, getTweets, likeTweet, deleteTweet };