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
		(email, password, done) => {
			// callback with email and password from our form
			conn.query(
				'SELECT * FROM users WHERE email = ?',
				[email],
				(err, results, req) => {
					if (err) throw err;
					if (!results.length) {
						return done(null, false, { message: 'No user found' });
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
		successRedirect: '/session',
		failureRedirect: '/login?success=false',
		failureFlash: true,
	})
);

module.exports = router;
