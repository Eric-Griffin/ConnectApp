const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Event = require('../models/Event');
const EventSwipe = require('../models/EventSwipe');
const User = require('../models/User');

// @route   GET /api/events/deck
// @desc    Get a deck of events for the user to swipe on
router.get('/deck', protect, async (req, res) => {
  try {
    // For MVP, we just get all active events.
    // In future, this would be curated based on user location, interests, etc.
    const events = await Event.find({ isActive: true });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/events/:eventId/interested
// @desc    Log a user's interest in an event
router.post('/:eventId/interested', protect, async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Record the swipe/interest
        await EventSwipe.findOneAndUpdate(
            { userId, eventId },
            { isInterested: true },
            { upsert: true, new: true } // Creates a new doc if one doesn't exist
        );

        res.status(200).json({ message: 'Interest recorded' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/events/:eventId/people
// @desc    Get people interested in a specific event
router.get('/:eventId/people', protect, async (req, res) => {
    try {
        const { eventId } = req.params;
        
        // Find all user IDs who are interested in this event
        const interestedSwipes = await EventSwipe.find({ eventId, isInterested: true }).select('userId');
        const interestedUserIds = interestedSwipes.map(swipe => swipe.userId);

        // Fetch the profiles of these users
        // For now, we are not implementing complex matching logic, just returning all interested users.
        const people = await User.find({ '_id': { $in: interestedUserIds } }).select('-password');

        res.json(people);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Note: A route to create events would go here, but for the MVP,
// we assume events are manually added to the database.

module.exports = router;