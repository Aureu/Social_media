const conn = require('../database');
const userProfileModel = require('../models/User');
const express = require('express');
const { resolve } = require('path');
const router = express.Router();

// Shows user profile by username
router.get('/:username', async (req, res) => {
	const username = req.params.username;
	const data = await userProfileModel.getUser(username);
	const posts = await userProfileModel.Posts(username);

	res.render('userProfile/user', {
		title: 'User',
		style: 'profile/profilePage.css',
		userdata: data[0],
		posts: posts,
	});
});

// Following -- not done
router.post('/:id', (req, res, next) => {
	const followerId = req.user.id;
	const followedId = parseInt(req.params.id);

	let sql = `SELECT * FROM followers WHERE follower_id = ?`;
	conn.query(sql, followerId, (err, results) => {
		if (results[0].followed_id !== followedId) {
			userProfileModel.follow(followerId, followedId);
			console.log(+followerId + 'followed' + followedId);
		} else {
			console.log('You already follow this user');
		}
	});
});

module.exports = router;
