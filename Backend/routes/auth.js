
const express = require('express');
const { register, login, dashboard, logout } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Protected Dashboard Route
router.get('/dashboard', authenticate, dashboard);

// Logout Route
router.post('/logout', logout);

module.exports = router;
