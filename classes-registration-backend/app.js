// app.js

const express = require('express');
const cors = require('cors');
const sportClassRoutes = require('./routes/sportClassRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from the React server
}));

app.use(express.json())

//Routes
app.use('/api/sportclasses', sportClassRoutes)
app.use('/api/users', userRoutes)

module.exports = app;