const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup');
const loginController = require('../controllers/login');

// Route pro signup
router.get('/signup', (req, res) => {
	res.render('signup', {
		title: 'SignUp',
		style: 'signup.css',
	});
});

// Route pro login
router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login',
		style: 'login.css',
	});
});

// Route pro register s controllerem
router.post('/signup', signupController.signup);
// Route pro login s controllerem
router.post('/login', loginController.login);
module.exports = router;
