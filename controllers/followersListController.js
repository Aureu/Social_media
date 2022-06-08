const express = require('express');
const router = express.Router();
const followerModel = require('../models/followers');

// Route for static page of login
router.get('/', async (req, res) => {
	const user_id = req.user.id;
	const followers = await followerModel.viewFollowers(user_id);
	res.render('followers/followers', {
		title: 'login',
		style: 'followers/style.css',
		data: followers,
	});
	console.log(followers);
});

module.exports = router;
