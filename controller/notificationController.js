const Notification = require('../models/notification');
const User = require('../models/user');
const Tweet = require('../models/tweet');

// Get user's notifications (unread only by default)
const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const showAll = req.query.showAll === 'true'; // Show all notifications including read ones

    // Build query - by default show only unread notifications
    const query = { userId };
    if (!showAll) {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .populate('actorId', 'username displayName profilePicture')
      .populate({
        path: 'tweetId',
        select: 'content author createdAt',
        populate: {
          path: 'author',
          select: 'username displayName'
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalCount = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ userId, isRead: false });

    res.json({
      notifications,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      },
      unreadCount,
      message: showAll ? 'Showing all notifications' : 'Showing unread notifications only'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

// Get unread notifications count
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const unreadCount = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });

    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching unread count' });
  }
};

// Mark specific notification as read (it will disappear from unread list)
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOne({
      _id: notificationId,
      userId
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    if (notification.isRead) {
      return res.json({ message: 'Notification already marked as read' });
    }

    // Mark as read - it will disappear from unread notifications
    notification.isRead = true;
    await notification.save();

    res.json({ 
      message: 'Notification marked as read and will no longer appear in unread list',
      notificationId: notification._id
    });
  } catch (error) {
    res.status(500).json({ error: 'Error marking notification as read' });
  }
};

// Mark all notifications as read (they will disappear from unread list)
const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );

    res.json({ 
      message: 'All notifications marked as read and will no longer appear in unread list',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Error marking all notifications as read' });
  }
};

module.exports = {
  getNotifications,
  markNotificationAsRead,
  markAllAsRead,
  getUnreadCount
};
