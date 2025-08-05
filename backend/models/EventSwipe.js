const mongoose = require('mongoose');

const EventSwipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  isInterested: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure a user can only have one swipe record per event
EventSwipeSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('EventSwipe', EventSwipeSchema);