const express = require('express');
const registerController = require('../controllers/register');
const loginController = require('../controllers/login');

const router = express.Router();

// Route for register
router.post('/register', registerController.register);
// Route for login
router.post('/login', loginController.login);

module.exports = router;
