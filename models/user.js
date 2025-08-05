const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  bio: {
    type: String,
    maxlength: 160,
    default: ''
  },
  followersCount: {
    type: Number,
    default: 0
  },
  followingCount: {
    type: Number,
    default: 0
  },
  following: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
}],
followers: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
}]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);