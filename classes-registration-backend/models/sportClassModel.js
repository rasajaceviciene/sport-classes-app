// models/sportClassModel.js

const mongoose = require('mongoose');

const sportClassSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Užsiėmimų pavadinimas privalomas']
    },
    description: {
        type: String,
        required: [true, 'Aprašymas privalomas']
    },
    durationHours: {
        type: Number,
        required: [true, 'Trukmė valandomis privaloma']
    },
    trainer: {
        type: String,
        required: [true, 'Trenerio vardas privalomas']
    },
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});

const SportClass = mongoose.model('SportClass', sportClassSchema);
module.exports = SportClass;
