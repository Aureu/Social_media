const conn = require('../database');
const userProfileModel = require('../models/User');
const express = require('express');
const router = express.Router();

// Shows user profile by username
router.get('/:username', async (req, res) => {
	const username = req.params.username;
	const data = await userProfileModel.getUser(username);
	const data1 = await userProfileModel.getUser1(username);
	const posts = await userProfileModel.Posts(username);
	res.render('userProfile/user', {
		title: 'User',
		style: 'profile/profilePage.css',
		userdata: data[0],
		userdata1: data1[0],
		posts: posts,
	});
});

// Following -- not done
router.post('/:id', (req, res, next) => {
	const followerId = req.user.id;
	const followedId = req.params.id;
	userProfileModel.follow(followerId, followedId);
	console.log(+followerId + 'followed' + followedId);
});

module.exports = router;
