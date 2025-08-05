const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Match = require('../models/Match');

// @route   GET /api/matches
// @desc    Get all of a user's matches
router.get('/', protect, async (req, res) => {
    try {
        const matches = await Match.find({ users: req.user.id })
            .populate('users', '-password') // Populate with user info
            .populate('eventId', 'name'); // Populate with event name

        res.json(matches);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Note: The logic for creating a match would be more complex and
// would live inside the 'swipe on person' route, which we can add later.
// For now, this lets us retrieve matches if they are created manually.

module.exports = router;