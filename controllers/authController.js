const User = require('../models/User'); // Mongoose User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Save the password directly without hashing
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username } });
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.status(400).json({ error: err.message });
  }
};



// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Directly compare plain-text passwords
    if (user.password !== password) {
      throw new Error('Invalid username or password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(400).json({ error: err.message });
  }
};


