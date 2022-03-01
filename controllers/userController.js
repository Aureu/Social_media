const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connection = require('../database');
const express = require('express');
const router = require('./register');
const Users = require('../models/users');

router.get('/user_list', (req, res) => {
	Users.view(rows);
});

router.get('/user_list', userController.view);
// Editování uživatelů
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.post('/', userController.find);
// Zobrazení jednotlivého uživatele
router.get('/viewuser/:id', userController.view_user);
// Přidání uživatele
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
// Smazání uživatele
router.get('/delete/:id', userController.delete);

router.get('/');
// Zobrazení uživatelů do tabulky
exports.view = (req, res) => {
	connection
		.query

		/* // Zobrazí všechny aktivní uživatele
		'SELECT * FROM users WHERE status = "active"',
		(err, rows) => {
			// Pokud najde chybu, vypíše jí do konzole
			if (err) {
				console.log(err);
			} else {
				// Zobrazí view user_list
				return res.render('user_list', {
					rows,
					style: 'user_list.css',
					title: 'user_list',
				});
			}
			console.log('Data z tabulky: \n', rows);
		}
	); */
		();
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
				res.render('edit-user', {
					rows,
					style: 'edit-user.css',
					title: 'edit',
				});
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
								alert: `${fName} byl upraven.`,
								style: 'edit-user.css',
								title: 'update',
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
				res.render('view-user', {
					rows,
					style: 'view-user.css',
					title: 'view',
				});
			}
			console.log('Data z tabulky: \n', rows);
		}
	);
};

exports.form = (req, res) => {
	res.render('add-user', {
		style: 'add-user.css',
	});
};

// Přídání nového uživatele
exports.create = (req, res) => {
	// Získává data z formu
	const { fName, lName, username, email, password } = req.body;
	const status = 'active';
	const type = 'personal';

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
					message: 'Tento email se již využívá',
					style: 'add-user.css',
					title: 'add',
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
							style: 'add-user.css',
							title: 'add',
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

module.exports = router;
