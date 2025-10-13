const express = require('express');
const { 
  getNotifications, 
  markNotificationAsRead, 
  markAllAsRead, 
  getUnreadCount 
} = require('../controller/notificationController');
const authenticate = require('../middleware/auth');
const handleValidationErrors = require('../middleware/validation');
const { 
  markAsReadValidation
} = require('../validators/notificationValidation');

const router = express.Router();

// All notification routes require authentication
router.use(authenticate);

// Get user's notifications (shows unread only by default)
router.get('/', getNotifications);

// Get unread notifications count
router.get('/unread-count', getUnreadCount);

// Mark specific notification as read (it will disappear from list)
router.put('/:notificationId/read', markAsReadValidation, handleValidationErrors, markNotificationAsRead);

// Mark all notifications as read (they will disappear from list)
router.put('/mark-all-read', markAllAsRead);

module.exports = router;
