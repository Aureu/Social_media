const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const conn = require('../database');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');

const app = express();

// Serializing
passport.serializeUser(function (user, done) {
	done(null, user);
});
// Deserializing
passport.deserializeUser(function (user, done) {
	done(null, user);
});
// Local strategy for passport
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
					// Searching if user doesnt exist in DB
					if (!results.length) {
						return done(null, false, { message: 'Uživatel nenalezen!' });
					}
					// Grab password from DB and unhash it
					bcrypt.compare(
						password,
						results[0].hashedPassword,
						(err, isMatch) => {
							if (err) throw err;
							// Then it checks if passwords match and login user
							if (isMatch) {
								return done(null, results[0]);
							} else {
								return done(null, false, {
									message: 'Zadali jste špatné heslo!',
								});
							}
						}
					);
				}
			);
		}
	)
);

module.exports = passport;
