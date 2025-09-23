const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/me
// @desc    Get current user's profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/me
// @desc    Update user profile
router.put('/me', protect, async (req, res) => {
    const { name, birthday, gender, interestTags, habits, prompts, photos } = req.body;
    const profileFields = {};
    if (name) profileFields.name = name;
    if (birthday) profileFields.birthday = birthday;
    if (gender) profileFields.gender = gender;
    if (interestTags) profileFields.interestTags = interestTags;
    if (habits) profileFields.habits = habits;
    if (prompts) profileFields.prompts = prompts;
    if (photos) profileFields.photos = photos;


    try {
        let user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/users/me/phone
// @desc    Update user phone number
router.put('/me/phone', protect, async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ msg: 'Phone number is required' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.phoneNumber = phoneNumber;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// THIS IS THE UPDATED ROUTE
// @route   GET /api/users/all
// @desc    Get all users (for testing the people deck)
router.get('/all', async (req, res) => {
    // This is our first "spy" message.
    console.log('GET /api/users/all route was hit!'); 
    try {
        const users = await User.find().select('-password');
        // This is our second "spy" message.
        console.log(`Found ${users.length} users in the database.`); 
        res.json(users);
    } catch (err) {
        // This will catch any database errors.
        console.error('Error fetching users:', err.message); 
        res.status(500).send('Server Error');
    }
});

module.exports = router;
