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

// Route for static page of login
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
		successRedirect: '/account',
		failureRedirect: '/login?success=false',
		failureFlash: true,
	})
);

module.exports = router;
