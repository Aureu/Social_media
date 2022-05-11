const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = express.Router();
const editModel = require('../models/editProfile');

// Route for static page
router.get('/profile', (req, res) => {
	res.render('profile/editProfile', {
		title: 'Edit Profile',
		style: 'profile/editProfile.css',
	});
});

// Route that takes data from form and then save them into the DB
router.post('/edit-profile-data', async (req, res) => {
	try {
		const { firstname, lastname, username, password, email } = req.body;
		console.log(req.body);
		const hashedPassword = await bcrypt.hash(password, 10);
		editModel.editProfile(firstname, lastname, username, hashedPassword, email);
		res.redirect('/account/:id');
	} catch {
		res.redirect('/profile/edit-profile');
	}
});

router.get('/info', (req, res) => {
	res.render('profile/editInfo', {
		title: 'Edit',
		style: 'profile/editInfo.css',
	});
});

router.post('/insert-profile-info', (req, res) => {
	const id = req.user.id;
	const bio = req.body.bio;
	const location = req.body.location;
	const dateBirth = req.body.dateBirth;
	editModel.editInfo(id, bio, location, dateBirth);
	res.redirect('/account/:id');
});

module.exports = router;
