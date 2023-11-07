// server/src/routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Helper function to generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token valid for 30 days
  });
};

// Register user
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate request body
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  // Check if user role is valid
  if (!['admin', 'vendor'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

   // If user with email does not exist
   if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  // If password does not match
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;