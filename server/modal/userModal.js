const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: {
    type: String, 
    required: true
  },
  profile: {
    type: String,
    default: "https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg"
  },
  verificationCode: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  bookmarks: {
    type: Array
  },
  history: [{
    animeId: {
      type: String
    },
    epId: {
      type: String
    },
    image: {
      type: String
    },
    title: {
      type: String
    }
  }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;