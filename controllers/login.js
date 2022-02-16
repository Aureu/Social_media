const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const conn = require('../database');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	conn.query('SELECT * FROM users WHERE id = ' + id, function (err, rows) {
		done(err, rows[0]);
	});
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		function (req, res, email, password, done) {
			conn.query(
				"SELECT * FROM `users` WHERE `email` = '" + email + "'",
				function (err, rows) {
					if (err) return done(err);
					if (!rows.length) {
						return done(null, false);
					}
					const hashedPassword = results[0].password;
					const isMatch = bcrypt.compareSync(password, hashedPassword);
					if (err) return done(err);
					if (!isMatch) {
						return done(
							null,
							false,
							req.flash({ message: 'Incorrect password' })
						);
					}
					return done(null, user);
				}
			);
		}
	)
);

router.get('/', (req, res) => {
	res.render('login', {
		title: 'login',
		style: 'login.css',
	});
});

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
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
