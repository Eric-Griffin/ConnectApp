const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  phoneNumber: { type: String, unique: true, sparse: true },
  age: { type: Number },
  height: { type: Number },
  photos: { type: [String], default: [] },
  bio: { type: String },
  prompts: [{
    question: String,
    answer: String,
  }],
  interestTags: { type: [String], default: [] },
  gender: { type: String },
  habits: {
    drinking: { type: String },
    smoking: { type: String },
    workout: { type: String },
  },
  birthday: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);