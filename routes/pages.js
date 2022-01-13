const express = require('express');
const router = express.Router();

// Route for landing page(index)
router.get('/', (req, res) => {
	res.render('index', {
		title: 'Index',
		style: 'index.css',
	});
});

module.exports = router;
