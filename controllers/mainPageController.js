const express = require('express');
const router = express.Router();
const postModel = require('../models/post');
const profileModel = require('../models/profile');

// Route for main page
router.get('/', async (req, res) => {
	const user_id = req.user.id;
	const data = await postModel.viewAll();

	res.render('main_page/index', {
		title: 'mainpage',
		style: 'mainpage/main.css',
		jmeno: req.user.firstname,
		prijmeni: req.user.lastname,
		prezdivka: req.user.username,
		posts: data,
	});
});

module.exports = router;
