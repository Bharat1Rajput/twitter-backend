const Message = require('../models/message');

// Send a message
exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id; // from JWT middleware

  const message = await Message.create({ sender: senderId, receiver: receiverId, content });
  res.status(201).json({ message });
};

// Get conversation with another user
exports.getConversation = async (req, res) => {
  const { userId } = req.params; // the other user
  const currentUser = req.user.id;

  const messages = await Message.find({
    $or: [
      { sender: currentUser, receiver: userId },
      { sender: userId, receiver: currentUser }
    ]
  }).sort({ createdAt: 1 });

  res.status(200).json({ messages });
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  const { messageId } = req.params;

  const message = await Message.findByIdAndUpdate(messageId, { isRead: true }, { new: true });
  res.status(200).json({ message });
};
