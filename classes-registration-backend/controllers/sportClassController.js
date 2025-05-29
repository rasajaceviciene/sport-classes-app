// controllers/sportClassController.js

const SportClass = require('../models/sportClassModel');
const User = require('../models/userModel');

exports.createSportClass = async (req, res) => {
    try {
        const sportClass = await SportClass.create(req.body);
        res.status(201).json(sportClass);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllSportClasses = async (req, res) => {
    try {
        const sportClasses = await SportClass.find().populate('users');
        res.json(sportClasses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.registerUserToSportClass = async (req, res) => {
    const { sportClassId } = req.params;
    const { userId } = req.body;

    try {
        const sportClass = await SportClass.findById(sportClassId);
        const user = await User.findById(userId);

        if (!sportClass || !user) {
            return res.status(404).json({ error: 'Užsiėmimas arba vartotojas nerastas' });
        }

        if (!sportClass.users.includes(userId)) {
            sportClass.users.push(userId);
            await sportClass.save();
        }

        if (!user.sportClasses.includes(sportClassId)) {
            user.sportClasses.push(sportClassId);
            await user.save();
        }

        res.json({ message: 'Vartotojas užregistruotas į užsiėmimą' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
