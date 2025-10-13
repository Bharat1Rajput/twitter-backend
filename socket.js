const Message = require('./models/message');

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected:', socket.id);
    
    // Join user-specific room for private messaging
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    // Handle sending messages
    socket.on('send_message', async ({ senderId, receiverId, content }) => {
        if (!content || !receiverId) return;
      const message = await Message.create({
              sender: senderId,
              receiver: receiverId,
              content
                });
      io.to(receiverId).emit('new_message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });
};

module.exports = { initSocket };

