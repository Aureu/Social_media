const express = require('express');
const router = express.Router();
const postModel = require('../models/post');
const profileModel = require('../models/profile');

// Route for main page
router.get('/', async (req, res) => {
	const user_id = req.user.id;
	const data = await postModel.viewAll(user_id);
	const profile = await profileModel.viewProfile(user_id);

	res.render('main_page/index', {
		title: 'mainpage',
		style: 'mainpage/main.css',
		profile: profile[0],
		posts: data,
	});
});

module.exports = router;
