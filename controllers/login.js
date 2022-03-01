const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const conn = require('../database');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');

const app = express();

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
//serializeuser

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		function (email, password, done) {
			// callback with email and password from our form
			conn.query(
				'SELECT * FROM users WHERE email = ?',
				[email],
				(err, results, field) => {
					if (err) throw err;
					if (!results.length) {
						return done(null, false, { message: 'No user found' }); // req.flash is the way to set flashdata using connect-flash
					}

					bcrypt.compare(password, results[0].heslo, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							return done(null, results[0]);
						} else {
							return done(null, false, { message: 'Password incorrect' });
						}
					});
				}
			);
		}
	)
);

router.get('/', (req, res) => {
	res.render('login', {
		title: 'login',
		style: 'login.css',
		message: req.flash('error'),
	});
});

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		badRequestMessage: 'The email does not match any',
		failureFlash: true,
	})
);

module.exports = router;

// LOGIN
/* exports.login = (req, res) => {
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
}; */
