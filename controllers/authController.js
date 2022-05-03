const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const conn = require('../database');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const Auth = require('../models/Auth');

const app = express();

// Serializing
passport.serializeUser(function (user, done) {
	done(null, user);
});
// Deserializing
passport.deserializeUser(function (user, done) {
	done(null, user);
});
// Local strategie přihlašování, která se vkládá do route loginu (passport.authenticate)
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
					// Hledá jestli daný uživatel existuje v DB
					if (!results.length) {
						return done(null, false, { message: 'No user found' });
					}
					// Rozhashovavá heslo z DB s zadaným hesle uživatele
					bcrypt.compare(
						password,
						results[0].hashedPassword,
						(err, isMatch) => {
							if (err) throw err;
							if (isMatch) {
								return done(null, results[0]);
							} else {
								return done(null, false, { message: 'Password incorrect' });
							}
						}
					);
				}
			);
		}
	)
);

module.exports = passport;
