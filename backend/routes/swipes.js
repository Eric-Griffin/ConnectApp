const express = require('express');
const router = express.Router();
const EventSwipe = require('../models/EventSwipe');
const { protect } = require('../middleware/auth');

// @route   POST /api/swipes/event
// @desc    Record a user's interest ("like") on an event
router.post('/event', async (req, res) => {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
        return res.status(400).json({ message: 'User ID and Event ID are required.' });
    }

    try {
        await EventSwipe.findOneAndUpdate(
            { userId, eventId },
            { isInterested: true },
            { upsert: true, new: true }
        );
        res.status(201).json({ message: 'Event interest recorded successfully.' });
    } catch (err) {
        console.error('Error recording event swipe:', err.message);
        res.status(500).send('Server Error');
    }
});

// THIS IS THE NEW ROUTE
// @route   DELETE /api/swipes/event
// @desc    Remove a user's interest ("unlike") from an event
router.delete('/event', async (req, res) => {
    // We get the userId and eventId from the request body
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
        return res.status(400).json({ message: 'User ID and Event ID are required.' });
    }

    try {
        // This command finds and deletes the document in the EventSwipe collection
        // that matches both the userId and the eventId.
        const result = await EventSwipe.deleteOne({ userId, eventId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Event like not found.' });
        }

        res.status(200).json({ message: 'Event interest removed successfully.' });

    } catch (err) {
        console.error('Error removing event swipe:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
