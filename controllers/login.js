const conn = require('../database');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

// LOGIN
exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.pass;
	const sql = 'SELECT * FROM users WHERE email = ?';
	const search_query = mysql.format(sql, [email]);

	conn.query(
		// Hledání stejného emailu v databázi
		search_query,

		async (err, results) => {
			if (err) throw err;
			// Pokud se email nenašel, napíše se zpráva dole
			if (results.length == 0) {
				return res.render('login', {
					message: 'Email does not exist',
				});
			} else {
				const hashedPassword = results[0].password;
				// get the hashedPassword from result
				// Porovnávání hesla s hasnutym heslem
				if (await bcrypt.compare(password, hashedPassword)) {
					return res.render('login', {
						message: 'Logged',
					});
					// Když se nenajde, pošle se "password incorrect"
				} else {
					return res.render('login', {
						message: 'Password incorrect',
					});
				}
			}
		}
	);
};
