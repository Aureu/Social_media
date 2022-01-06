var express = require('express');
var router = express.Router();
var db = require('../database');

// Fetching data from database
router.get('/users_list', function (req, res, next) {
	var sql = 'SELECT * FROM users';
	db.query(sql, function (err, data, fields) {
		if (err) throw err;
		res.render('users_list', { title: 'User List', accountData: data });
	});
});
module.exports = router;
