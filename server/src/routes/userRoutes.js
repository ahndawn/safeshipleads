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

  console.log('Registering user:', { username, email, role });

  // Validate request body
  if (!username || !email || !password || !role) {
    console.log('Missing fields in registration');
    return res.status(400).json({ message: 'Please add all fields' });
  }

  // Check if user role is valid
  if (!['admin', 'vendor'].includes(role)) {
    console.log('Invalid role specified:', role);
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  // Check if user already exists
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }
  } catch (error) {
    console.error('Error checking existing user:', error);
    return res.status(500).json({ message: 'Error checking user existence' });
  }

  // Hash password
  try {
    console.log('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      console.log('User created successfully:', user);
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      console.log('Failed to create user');
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error hashing password or creating user:', error);
    res.status(500).json({ message: 'Error hashing password' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check for user email and explicitly select the password
  const user = await User.findOne({ email }).select('+password');

  // If user with email does not exist
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  // Log for debugging
  console.log(`User from DB: ${user}`);
  console.log(`User password from DB: ${user.password}`);
  console.log(`Password from request: ${password}`);

  // Ensure both passwords are defined
  if (!password || !user.password) {
    return res.status(400).json({ message: 'Password not provided or not set in user account' });
  }

// If password does not match
if (!(await bcrypt.compare(password, user.password))) {
  return res.status(401).json({ message: 'Incorrect password' });
}

// Successful login
res.json({
  _id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  token: generateToken(user._id, user.role),
});
});

module.exports = router;