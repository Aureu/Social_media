const jwt = require('jsonwebtoken');
const conn = require('../database');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
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
};
