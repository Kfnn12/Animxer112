const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  comments: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  }]
});

module.exports = mongoose.model('Comments', DiscussionSchema);