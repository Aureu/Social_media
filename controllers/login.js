const conn = require('../database');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

// LOGIN
exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const sql = 'SELECT * FROM users WHERE email = ?';
	const search_query = mysql.format(sql, [email]);
	const admin = 'admin@admin.com';

	conn.query(
		search_query,
		// Hledá jestli se email z inputu nachází v databázi
		async (err, results) => {
			if (err) throw err;
			// Pokud nenajde stejný email, hodí message 'Zadaný email neexistuje
			if (results.length == 0) {
				return res.render('login', {
					message: 'Zadaný email neexistuje',
				});
			} else {
				// Kontroluje jestli uživatel není admin
				if (email == admin) {
					// Získa zahashované heslo
					const hashedPassword = results[0].password;
					const isMatch = await bcrypt.compare(password, hashedPassword);
					// Kontroluje jestli jsou hesla stejná
					if (!isMatch) {
						return res.render('login', {
							message: 'Heslo není správné',
						});
					} else {
						// Pokud je uživatel admin, hodí ho do admin sekce
						res.redirect('/admin/user_list');
					}
					// Pokud není admin, pokračuje v loginu jako normální uživatel
				} else {
					// Získá zahashované heslo
					const hashedPassword = results[0].password;
					const isMatch = await bcrypt.compare(password, hashedPassword);
					// Kontroluje jestli jsou hesla stejná
					if (!isMatch) {
						return res.render('login', {
							message: 'Heslo není správné',
						});
					} else {
						// Pokud najde uživatele, přihlásí ho
						res.redirect('/user/account');
					}
				}
			}
		}
	);
};
