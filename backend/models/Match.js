const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  // Array of two user IDs who are matched
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // The event for which they matched
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  // We will store the chat channel URL from Sendbird here
  chatChannelUrl: { type: String },
  status: { type: String, enum: ['active', 'unmatched'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Match', MatchSchema);