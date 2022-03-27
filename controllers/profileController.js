const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = require('./register');

router.get('/account', async (req, res) => {
	email = req.user.email;
	res.render('profile/profile', {
		title: 'User',
		style: 'profile/profilePage.css',
		jmeno: req.user.jmeno, // Vkládat hodnoty uživatele
		prijmeni: req.user.prijmeni,
		prezdivka: req.user.prezdivka,
		email: email,
	});
	console.log(req.user);
});

router.get('/edit', async (req, res) => {
	res.render('profile/editProfile', {
		title: 'edit profile',
		style: 'profile/profilePage.css',
	});
});

module.exports = router;
