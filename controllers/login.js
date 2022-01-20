const conn = require('../database');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

// LOGIN
exports.login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const sql = 'SELECT * FROM users WHERE prezdivka = ?';
	const vyhledavani = mysql.format(sql, [username]);

	conn.query(
		vyhledavani,
		// Hledá jestli se email z inputu nachází v databázi
		async (err, results) => {
			if (err) throw err;
			// Pokud nenajde stejný email, hodí message 'Zadaný email neexistuje
			if (results.length == 0) {
				return res.render('login', {
					message: 'Zadaný uživatel neexistuje',
					style: 'login.css',
				});
			} else {
				// Kontroluje jestli uživatel není admin
				if (username == 'admin') {
					// Získa zahashované heslo
					const hashedPassword = results[0].heslo;
					const isMatch = await bcrypt.compare(password, hashedPassword);
					// Kontroluje jestli jsou hesla stejná
					if (!isMatch) {
						return res.render('login', {
							message: 'Zadané heslo není správné',
							style: 'login.css',
						});
					} else {
						// Pokud je uživatel admin, hodí ho do admin sekce
						res.redirect('/admin/user_list');
					}
					// Pokud není admin, pokračuje v loginu jako normální uživatel
				} else {
					// Získá zahashované heslo
					const hashedPassword = results[0].heslo;
					const isMatch = await bcrypt.compare(password, hashedPassword);
					// Kontroluje jestli jsou hesla stejná
					if (!isMatch) {
						return res.render('login', {
							message: 'Zadané heslo není správné',
						});
					} else {
						// Pokud najde uživatele, přihlásí ho
						return res.render('index', {
							style: 'index.css',
							prezdivka: username,
						});
					}
				}
			}
		}
	);
};
