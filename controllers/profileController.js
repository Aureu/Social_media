const mysql = require('mysql');
const conn = require('../database');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const profileModel = require('../models/profile');
const postModel = require('../models/post');
const editModel = require('../models/editProfile');

// Cesta na uživatelský profil
router.get('/account', async (req, res) => {
	const user_id = req.user.id;
	const profile = await profileModel.viewProfile(user_id);
	const data = await postModel.viewPost(user_id);
	const Avatar = await profileModel.viewAvatar(user_id);
	const userInfo = await profileModel.viewInfo(user_id);
	const counter = await profileModel.postCounter(user_id);
	const followingCounter = await profileModel.followingCounter(user_id);

	res.render('profile/profile', {
		title: 'User',
		style: 'profile/profilePage.css',
		// Variables that takes user info from sesssion
		profile: profile[0],
		userInfo: userInfo[0],
		posts: data,
		image: Avatar[0],
		counts: counter[0],
		followingCounts: followingCounter[0],
	});
	console.log(req.user);
	console.log(counter);
});

// Route for static page
router.get('/account/edit/:id', async (req, res) => {
	const user_id = req.user.id;
	const profile = await profileModel.viewProfile(user_id);
	res.render('profile/editProfile', {
		title: 'Edit Profile',
		style: 'profile/editProfile.css',
		profile: profile[0],
	});
});

// Route that takes data from form and then save them into the DB
router.post('/account/edit-profile/:id', async (req, res, err) => {
	console.log(req.params.id);
	const { firstname, lastname, username, email, password } = req.body;
	const id = req.params.id;
	console.log(req.body);
	const hashedPassword = await bcrypt.hash(password, 10);
	await editModel.editProfile(
		firstname,
		lastname,
		username,
		email,
		hashedPassword,
		id
	);
	res.redirect('/account');
});

// Route for editing user info -- remake into modal on profile page
router.get('/info', (req, res) => {
	res.render('profile/editInfo', {
		title: 'Edit',
		style: 'profile/editInfo.css',
	});
});

// Inserting user profile info
router.post('/insert-profile-info', (req, res) => {
	const id = req.user.id;
	const bio = req.body.bio;
	const location = req.body.location;
	const dateBirth = req.body.dateBirth;
	editModel.editInfo(id, bio, location, dateBirth);
	res.redirect('/account');
});

module.exports = router;
