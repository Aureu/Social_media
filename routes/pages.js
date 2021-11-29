const express = require('express');
const router = express.Router();
const session = require('express-session');

// Route for register
router.get('/', (req, res) => {
	res.render('register', {
		title: 'SignUp',
		style: 'register.css',
	});
});

// Route for login
router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login',
		style: 'login.css',
	});
});

// Route for account
router.get('/account', (req, res) => {
	session = req.session;
	res.render('account', {
		title: 'Account',
		style: 'account.css',
	});
});

module.exports = router;
