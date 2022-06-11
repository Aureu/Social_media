const express = require('express');
const router = express.Router();
const followerModel = require('../models/followers');
const profileModel = require('../models/profile');

// Route for following userlist page
router.get('/following', async (req, res) => {
	const user_id = req.user.id;
	const profile = await profileModel.viewProfile(user_id);
	const followers = await followerModel.viewFollowing(user_id);
	res.render('profile/followers', {
		title: 'login',
		style: 'followers/style.css',
		data: followers,
		profile: profile[0],
		status: true,
	});
});

router.get('/followers', async (req, res) => {
	const user_id = req.user.id;
	const profile = await profileModel.viewProfile(user_id);
	const followers = await followerModel.viewFollowers(user_id);
	res.render('profile/followers', {
		title: 'login',
		style: 'followers/style.css',
		data: followers,
		profile: profile[0],
		status: false,
	});
});

module.exports = router;
