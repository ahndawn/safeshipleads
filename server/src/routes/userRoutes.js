// server/src/routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token valid for 30 days
  });
};

// Register user
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Validate request body
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  // Check if user role is valid
  if (!['admin', 'vendor'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  // Check if user already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create user
  const user = await User.create({
    username,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check for user email
  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user.id,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;