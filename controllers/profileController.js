const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = express.Router();
const profileModel = require('../models/profile');
const postModel = require('../models/post');

// Cesta na uživatelský profil
router.get('/account', async (req, res) => {
	const user_id = req.user.id;
	const data = await postModel.viewPost(user_id);
	const Avatar = await profileModel.viewAvatar(user_id);
	const userInfo = await profileModel.viewInfo(user_id);
	const followers = await profileModel.getFollowers(user_id);

	email = req.user.email;
	res.render('profile/profile', {
		title: 'User',
		style: 'profile/profilePage.css',
		// Variables that takes user info from sesssion
		jmeno: req.user.firstname,
		prijmeni: req.user.lastname,
		prezdivka: req.user.username,
		email: email,
		userInfo: userInfo[0],
		posts: data,
		image: Avatar[0],
		followers: followers,
	});
	console.log(req.user);
});

module.exports = router;
