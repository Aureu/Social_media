const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = require('./register');
const editModel = require('../models/editProfile');

router.get('/edit-profile', (req, res) => {
	res.render('profile/editProfile', {
		title: 'Edit Profile',
		style: 'profile/editProfile.css',
	});
});

router.post('/edit-profile-data', async (req, res) => {
	try {
		const { firstname, lastname, username, password, email } = req.body;
		console.log(req.body);
		// Hashovaní hesla před uložením do DB
		const hashedPassword = await bcrypt.hash(password, 10);
		editModel.editProfile(firstname, lastname, username, hashedPassword, email);
		res.redirect('/profile/account');
	} catch {
		res.redirect('/profile/edit-profile');
	}
});

module.exports = router;
