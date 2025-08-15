const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Event = require('../models/Event');
const EventSwipe = require('../models/EventSwipe');
const User = require('../models/User');

// This route is unchanged
router.get('/deck', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// This route is also unchanged for now
router.post('/:eventId/interested', protect, async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id; // Assuming you'll send a real token later

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await EventSwipe.findOneAndUpdate(
            { userId, eventId },
            { isInterested: true },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'Interest recorded' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// THIS IS THE CORRECTED ROUTE
// It now correctly uses the eventId to find interested users.
router.get('/:eventId/people', async (req, res) => {
    try {
        const { eventId } = req.params;
        
        // 1. Find all the 'EventSwipe' records for this specific event.
        const interestedSwipes = await EventSwipe.find({ 
            eventId: eventId, 
            isInterested: true 
        }).select('userId');

        // 2. Extract just the user IDs from those records.
        const interestedUserIds = interestedSwipes.map(swipe => swipe.userId);

        // 3. Find all user profiles that match those IDs.
        const people = await User.find({ '_id': { $in: interestedUserIds } }).select('-password');

        console.log(`Found ${people.length} people for event ${eventId}`);
        res.json(people);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
