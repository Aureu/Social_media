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
		var insertData = `INSERT INTO avatars(user_id,file_src)VALUES('${id}', '${imgsrc}')`;
		conn.query(insertData, [imgsrc], (err, result) => {
			if (err) throw err;
			console.log('file uploaded');
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
	postModel.addPost(user_id, text);
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

module.exports = router;
