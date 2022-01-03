const express = require('express');
const router = express.Router();

// Route for admin dashboard
router.get('/admin_dashboard', (req, res) => {
	res.render('admin_dashboard', {
		title: 'Dashboard',
		style: 'admin_dashboard.css',
	});
});

// Route for accounts list
router.get('/accounts_list', (req, res) => {
	res.render('accounts_list', {
		title: 'Accounts',
		style: 'accounts.css',
	});
});
module.exports = router;
