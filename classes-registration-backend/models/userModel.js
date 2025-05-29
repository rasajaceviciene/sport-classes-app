// models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vartotojo vardas privalomas']
    },
    email: {
        type: String,
        required: [true, 'El. paštas privalomas'],
        unique: true
    },
    sportClasses: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SportClass'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
