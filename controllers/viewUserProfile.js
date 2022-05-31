const conn = require('../database');
const userProfileModel = require('../models/viewUser');
const express = require('express');
const router = express.Router();

router.get('/:username', async (req, res) => {
	var username = req.params.username;
	const data = await userProfileModel.getUser(username);
	res.render('userProfile/user', {
		title: 'User',
		style: 'profile/profilePage.css',
		user: data,
	});
});

module.exports = router;
