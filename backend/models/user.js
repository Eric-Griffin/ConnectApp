const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  height: { type: Number },
  photos: { type: [String], default: [] }, // Array of URLs to photos on S3
  bio: { type: String },
  prompts: [{
    question: String,
    answer: String,
  }],
  interestTags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);