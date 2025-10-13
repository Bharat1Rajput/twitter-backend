const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // who RECEIVES the notification

  actorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // who TRIGGERS (liker, follower, etc.)

  type: { 
    type: String, 
    enum: ["like", "follow", "reply", "retweet"], 
    required: true 
  },

  tweetId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Tweet" 
  }, // optional (used for like/reply/retweet)

  isRead: { 
    type: Boolean, 
    default: false 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
