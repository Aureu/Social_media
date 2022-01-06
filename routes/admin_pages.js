const express = require('express');
const router = express.Router();

// Route for admin dashboard
router.get('/admin_dashboard', (req, res) => {
	res.render('admin_dashboard', {
		title: 'Dashboard',
		style: 'admin_dashboard.css',
	});
});

module.exports = router;
