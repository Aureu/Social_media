const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('main_page/index', {
		title: 'mainpage',
		style: 'mainpage/main.css',
	});
});

module.exports = router;
