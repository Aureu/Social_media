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
		var user_id = req.user.id;
		var insertData = `INSERT INTO user_avatars(file_src, user_id) VALUES('${imgsrc}','${user_id}') ON DUPLICATE KEY UPDATE file_src = '${imgsrc}'`;

		conn.query(insertData, [imgsrc], (err, result) => {
			if (err) throw err;
			console.log('file uploaded');
			res.redirect('/profile/account');
		});
	}
});

router.get('/upload', (req, res) => {
	res.render('profile/editAvatar', {
		title: 'Add Avatar',
		style: 'profile/editAvatar.css',
	});
});

module.exports = router;
