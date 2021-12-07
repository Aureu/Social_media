const express = require('express');
const router = express.Router();

// Route for landing page(index)
router.get('/', (req, res) => {
	res.render('index', {
		title: 'Index',
		style: 'index.css',
	});
});

// Route for register
router.get('/register', (req, res) => {
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
	res.render('account', {
		title: 'Account',
		style: 'account.css',
	});
});

module.exports = router;
