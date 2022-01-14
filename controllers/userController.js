const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connection = require('../database');

// Zobrazení uživatelů do tabulky
exports.view = (req, res) => {
	connection.query(
		// Zobrazí všechny aktivní uživatele
		'SELECT * FROM users WHERE status = "active"',
		(err, rows) => {
			// Pokud najde chybu, vypíše jí do konzole
			if (err) {
				console.log(err);
			} else {
				let removedUser = req.query.removed;
				// Zobrazí view user_list
				res.render('user_list', { rows, removedUser });
			}
			console.log('Data z tabulky: \n', rows);
		}
	);
};

// Přesměrování na 'edit-user' podle přesného id z tabulky
exports.edit = (req, res) => {
	connection.query(
		// Vezme uživatele podle jeho ID z tabulky
		'SELECT * FROM users WHERE user_id = ?',
		[req.params.id],
		(err, rows) => {
			if (err) {
				console.log(err);
			} else {
				// Zobrazí view edit-user
				res.render('edit-user', { rows });
			}
			console.log('Data z tabulky: \n', rows);
		}
	);
};

// Změnění dat uživatele
exports.update = (req, res) => {
	const { fName, lName, username, email } = req.body;
	connection.query(
		// Změní určitá data uživatele v databázi
		'UPDATE users SET jmeno = ?, prijmeni = ?, prezdivka = ?, email = ? WHERE user_id = ?',
		[fName, lName, username, email, req.params.id],
		(err, rows) => {
			// Vypisování chyb
			if (err) {
				console.log(err);
			} else {
				connection.query(
					// Vybere uživatele podle ID a změní mu data
					'SELECT * FROM users WHERE user_id = ?',
					[req.params.id],
					(err, rows) => {
						if (err) {
							console.log(err);
						} else {
							// Zobrazí view 'edit-user'
							res.render('edit-user', {
								rows,
								alert: `${fName} has been updated.`,
							});
						}
						console.log('Data z tabulky: \n', rows);
					}
				);
			}
			console.log('Data z tabulky: \n', rows);
		}
	);
};

// Zobrazování jednotlivých uživatelů a jejich informací
exports.view_user = (req, res) => {
	connection.query(
		// Vybere uživatele podle jeho ID v tabulce
		'SELECT * FROM users WHERE user_id = ?',
		[req.params.id],
		(err, rows) => {
			if (err) {
				console.log(err);
			} else {
				// Zobrazí view 'view-user'
				res.render('view-user', { rows });
			}
			console.log('Data z tabulky: \n', rows);
		}
	);
};

exports.form = (req, res) => {
	res.render('add-user');
};

// Přídání nového uživatele
exports.create = (req, res) => {
	// Získává data z formu
	const { fName, lName, username, email, password } = req.body;
	const status = 'active';

	connection.query(
		// SQL příkaz co hledá stejný email v DB
		'SELECT email FROM users WHERE email = ?',
		[email],
		async (error, results) => {
			if (error) {
				console.log(error);
			}
			// Hledání stejného emailu v DB
			if (results.length > 0) {
				return res.render('add-user', {
					alert: 'That email is already in use',
				});
			}
			// Hashování hesla
			let hashedPassword = await bcrypt.hash(password, 10);

			connection.query(
				// Vkládání dat z formu do tabulky users v DB
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
						// Vrátí alert jestli se uživatel přidal
						return res.render('add-user', {
							alert: 'Uživatel byl přidán',
						});
					}
				}
			);
		}
	);
};

// Změnění aktivního uživatele na neaktivního uživatele
exports.delete = (req, res) => {
	connection.query(
		// SQL příkaz pro status
		'UPDATE users SET status = ? WHERE user_id = ?',
		['removed', req.params.id],
		(err, rows) => {
			if (!err) {
				res.redirect('/admin/user_list');
			} else {
				console.log(err);
			}
			console.log('Data z tabulky: \n', rows);
		}
	);
};
