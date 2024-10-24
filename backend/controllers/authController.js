const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    console.log("Signup request received:", req.body);  // Log the incoming request

    try {
        const { firstName, lastName, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists");
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        console.log("User created successfully:", user);  // Log the created user

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Error during signup:", error);  // Log any errors
        res.status(500).json({ message: 'Server error' });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ message: 'User logged out' });
};

exports.userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ success: true, user, timestamp: new Date().toISOString() });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const updatedData = req.body;

        const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ success: true, user, timestamp: new Date().toISOString() });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};