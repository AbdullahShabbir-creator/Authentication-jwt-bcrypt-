const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const tokenBlacklist = new Set();


exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).send("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password.trim());
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Protected Route (Dashboard)
exports.dashboard = (req, res) => {
  res.json({ message: `Welcome ${req.user.userId}` });
};

// Logout User
exports.logout = (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(400).json({ message: 'Token not provided' });
  }
  tokenBlacklist.add(token);

  res.status(200).json({ message: 'Logout successful' });
};
