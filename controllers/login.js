const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const conn = require('../database');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const auth = require('./authController');

const app = express();

// Render login formu
router.get('/', (req, res) => {
	res.render('auth/login', {
		title: 'login',
		style: 'auth/login.css',
		message: req.flash('error'),
	});
});
// Passport
router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/profile/account',
		failureRedirect: '/login?success=false',
		failureFlash: true,
	})
);

// Dodělat logout
router.delete('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

module.exports = router;
