const express = require('express');
const router = express.Router();
const conn = require('../database');
const searchModel = require('../models/search');
const profileModel = require('../models/profile');

router.post('/', async (req, res) => {
	const str = req.body.typeahead;
	const user_id = req.user.id;
	const data = await searchModel.search(str);
	const profile = await profileModel.viewProfile(user_id);

	console.log(data);
	res.render('search/searchUsers', {
		users: data,
		profile: profile[0],
		style: 'search/search.css',
	});
});

module.exports = router;
