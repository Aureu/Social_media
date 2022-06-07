const express = require('express');
const router = express.Router();
const postModel = require('../models/post');

// Route for main page
router.get('/', (req, res) => {
	data = postModel.viewAll();
	res.render('main_page/index', {
		title: 'mainpage',
		style: 'mainpage/main.css',
		posts: data,
	});
});

module.exports = router;
