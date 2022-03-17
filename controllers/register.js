const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Register = require('../models/register');

// Zobrazení stránky
router.get('/', (req, res) => {
	res.render('register', {
		title: 'Register',
		style: 'signup.css',
	});
});

// Dodělát error handling
router.post('/', async (req, res) => {
	try {
		const { jmeno, prijmeni, prezdivka, email, heslo } = req.body;
		const status = 'active';
		console.log(req.body);
		// Hashovaní hesla před uložením do DB
		const hashedPassword = await bcrypt.hash(heslo, 10);
		Register.register(
			jmeno,
			prijmeni,
			prezdivka,
			email,
			hashedPassword,
			status
		);
		res.redirect('/login');
	} catch {
		res.redirect('/register');
	}
});

module.exports = router;
