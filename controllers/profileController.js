const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = require('./register');
const profileModel = require('../models/profile');

// Cesta na uživatelský profil
router.get('/account', async (req, res) => {
	email = req.user.email;
	res.render('profile/profile', {
		title: 'User',
		style: 'profile/profilePage.css',
		// Proměnný do kterých se vkládají hodnoty ze sessions a následně zobrazují data do handlebars
		jmeno: req.user.jmeno,
		prijmeni: req.user.prijmeni,
		prezdivka: req.user.prezdivka,
		email: email,
	});
	console.log(req.user);
});

router.post('/add-bio', (req, res) => {
	const bio = req.body.bio;
	user_id = req.user.user_id;
	profileModel.addBio(user_id, bio);
	res.status(204).send();
});

// Cesta pro editování uživatele - není hotové
router.get('/edit', async (req, res) => {
	var id = req.user.user_id;
	const data = await profileModel.editProfile(id);
	res.render('profile/editProfile', {
		title: 'edit profile',
		style: 'profile/profilePage.css',
		user: data,
	});
});

router.post('/edit', async (req, res) => {
	var user = req.user;
	var id = req.user.id;
	await profileModel.updateProfile(user, id, function (data) {
		console.log('User updated');
	});
});

module.exports = router;
