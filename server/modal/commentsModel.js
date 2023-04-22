const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    comment: {
      type: String,
      required: true
    },
    discussionId: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  }
);

module.exports = mongoose.model('Comments', CommentSchema);