const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/me
// @desc    Get current user's profile
router.get('/me', protect, async (req, res) => {
  try {
    // req.user is attached by the 'protect' middleware
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
    const { name, age, height, bio, prompts, interestTags, photos } = req.body;

    const profileFields = {};
    if (name) profileFields.name = name;
    if (age) profileFields.age = age;
    if (height) profileFields.height = height;
    if (bio) profileFields.bio = bio;
    if (prompts) profileFields.prompts = prompts;
    if (interestTags) profileFields.interestTags = interestTags;
    if (photos) profileFields.photos = photos;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user = await User.findByIdAndUpdate(
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

module.exports = router;