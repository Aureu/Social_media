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

router.post('/', async (req, res) => {
	try {
		const { jmeno, prijmeni, prezdivka, email, heslo } = req.body;
		const status = 'active';
		console.log(req.body);

		const hashedPassword = await bcrypt.hash(heslo, 10);
		Register.register(
			jmeno,
			prijmeni,
			prezdivka,
			email,
			hashedPassword,
			status
		);
	} catch {
		res.redirect('/register');
	}
});

/* exports.signup = (req, res) => {
	// Získá data z register formu
	const { fName, lName, username, email, password } = req.body;
	const status = 'active';

	conn.query(
		// sql příkaz, který hledá jestli daný email už neexistuje
		'SELECT email FROM users WHERE email = ?',
		[email],
		async (error, results) => {
			if (error) {
				console.log(error);
			}
			// Hledá stejný email
			if (results.length > 0) {
				return res.render('signup', {
					message: 'Zadaný email se již využívá',
					style: 'signup.css',
				});
			}
			// Hashování hesla
			let hashedPassword = await bcrypt.hash(password, 10);

			conn.query(
				// Vkládá data do tabulky users
				'INSERT INTO users SET ?',
				{
					jmeno: fName,
					prijmeni: lName,
					prezdivka: username,
					heslo: hashedPassword,
					email: email,
					status: status,
				},
				(error, results) => {
					if (error) {
						console.log(error);
					} else {
						console.log(results);
						// Přesměruje na přihlášení
						res.redirect('/login');
					}
				}
			);
		}
	);
}; */

module.exports = router;
