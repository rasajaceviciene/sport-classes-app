// routes/sportClassRoutes.js

const express = require('express');
const router = express.Router();
const sportClassController = require('../controllers/sportClassController');

router.post('/', sportClassController.createSportClass);
router.get('/', sportClassController.getAllSportClasses);
router.post('/:sportClassId/register', sportClassController.registerUserToSportClass);

module.exports = router;

