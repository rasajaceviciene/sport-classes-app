// controllers/userController.js

const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('sportClasses');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


