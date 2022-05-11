const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = express.Router();
const postModel = require('../models/post');

// Adding new post data into the DB
router.post('/add-post', (req, res) => {
	const text = req.body.postMessage;
	user_id = req.user.id;
	username = req.user.username;
	postModel.addPost(text, user_id, username);
	res.redirect('back');
});

module.exports = router;
