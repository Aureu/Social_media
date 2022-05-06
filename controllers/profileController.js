const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = require('./register');
const profileModel = require('../models/profile');
const postModel = require('../models/post');

const path = require('path');
const multer = require('multer');

// Multer Middleware
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/Avatars');
	},

	filename: (req, file, cb) => {
		console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
	if (!req.file) {
		console.log('No file upload');
	} else {
		console.log(req.file.filename);
		var imgsrc = req.file.filename;
		var id = req.user.user_id;
		var insertData = `UPDATE avatars SET file_src = '${imgsrc}' WHERE user_id = '${id}'`;

		conn.query(insertData, [imgsrc], (err, result) => {
			if (err) throw err;
			console.log('file uploaded');
			res.redirect('/profile/account');
		});
	}
});

// Cesta na uživatelský profil
router.get('/account', async (req, res) => {
	user_id = req.user.user_id;
	const data = await profileModel.viewPost(user_id);
	const Avatar = await profileModel.viewAvatar(user_id);
	const userInfo = await profileModel.viewInfo(user_id);

	email = req.user.email;
	res.render('profile/profile', {
		title: 'User',
		style: 'profile/profilePage.css',
		// Proměnný do kterých se vkládají hodnoty ze sessions a následně zobrazují data do handlebars
		jmeno: req.user.firstname,
		prijmeni: req.user.lastname,
		prezdivka: req.user.username,
		email: email,
		userInfo: userInfo,
		posts: data,
		image: Avatar,
	});
	console.log(req.user);
});

router.get('/account', (req, res) => {});

router.post('/add-bio', (req, res) => {
	const bio = req.body.bio;
	user_id = req.user.user_id;
	profileModel.addBio(user_id, bio);
	res.status(204).send();
});

router.post('/add-post', (req, res) => {
	const text = req.body.postMessage;
	console.log(req.body.text);
	user_id = req.user.user_id;
	username = req.user.username;
	postModel.addPost(user_id, username, text);
	res.status(204).send();
});

router.get('/edit-profile', (req, res) => {
	res.render('profile/editProfile', {
		title: 'Edit',
		style: 'profile/editProfile.css',
	});
});

router.post('/insert-profile-info', (req, res) => {
	const id = req.user.user_id;
	const bio = req.body.bio;
	const location = req.body.location;
	const dateBirth = req.body.dateBirth;
	profileModel.editProfile(id, bio, location, dateBirth);
	res.redirect('/profile/account');
});

module.exports = router;
