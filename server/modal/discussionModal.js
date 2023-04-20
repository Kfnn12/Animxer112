const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }]
});

module.exports = mongoose.model('Discussion', DiscussionSchema);