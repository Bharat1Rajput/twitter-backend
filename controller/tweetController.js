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

// Get personalized timeline (tweets from followed users)
const getPersonalizedTimeline = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const followingIds = user.following;

    // Include user's own tweets + tweets from followed users
    const tweets = await Tweet.find({
      author: { $in: [...followingIds, userId] }
    })
    .populate('author', 'username displayName profilePicture isVerified')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    res.json({ 
      tweets, 
      page: parseInt(page), 
      limit: parseInt(limit),
      message: 'Personalized timeline'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching timeline' });
  }
};

// Get user's tweets
const getUserTweets = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const tweets = await Tweet.find({ author: userId })
      .populate('author', 'username displayName profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalTweets = await Tweet.countDocuments({ author: userId });

    res.json({ 
      tweets, 
      totalTweets,
      page: parseInt(page), 
      limit: parseInt(limit) 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user tweets' });
  }
};

// Get tweet analytics
const getTweetAnalytics = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.user._id;

    const tweet = await Tweet.findById(tweetId);
    
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    // Only tweet author can see detailed analytics
    if (tweet.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      tweetId: tweet._id,
      likesCount: tweet.likesCount,
      retweetsCount: tweet.retweetsCount,
      repliesCount: tweet.repliesCount,
      createdAt: tweet.createdAt,
      engagementRate: ((tweet.likesCount + tweet.retweetsCount + tweet.repliesCount) / Math.max(tweet.author.followersCount, 1) * 100).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
};

module.exports = { createTweet, getTweets, likeTweet, deleteTweet, getPersonalizedTimeline, getUserTweets, getTweetAnalytics };