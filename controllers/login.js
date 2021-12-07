const conn = require('../database');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const session = require('express-session');

// LOGIN
exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.pass;
	const sql = 'SELECT * FROM users WHERE email = ?';
	const search_query = mysql.format(sql, [email]);

	conn.query(
		search_query,
		// Searching for a same email (Form input == database)
		async (err, results) => {
			if (err) throw err;
			// If email is not found, sends message 'Email does not exist'
			if (results.length == 0) {
				return res.render('login', {
					message: 'Email does not exist',
				});
			} else {
				// get the hashedPassword from result
				const hashedPassword = results[0].password;
				const isMatch = await bcrypt.compare(password, hashedPassword);
				// Matching input password with hashed password from database
				if (!isMatch) {
					return res.render('login', {
						message: 'Password incorrect',
					});
				} else {
					// If found user is logged
					return res.render('login', {
						message: 'Logged',
					});
				}
			}
		}
	);
};
