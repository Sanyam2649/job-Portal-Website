const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile, updateUserProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// auth routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/me', isAuthenticated, userProfile); // Fetch profile
router.put('/profile', isAuthenticated, updateUserProfile); // Update profile

module.exports = router;
