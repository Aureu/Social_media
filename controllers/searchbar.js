const express = require('express');
const router = express.Router();
const conn = require('../database');

// Post request for session
router.post('/', function (req, res) {
	var str = {
		// Data from search bar
		stringPart: req.body.typeahead,
	};

	conn.query(
		// SQL query -- inserts data from searchbar
		'SELECT username FROM users WHERE username LIKE "%' + str.stringPart + '%"',
		function (err, rows, fields) {
			if (err) throw err;
			var data = [];
			// for cycle that inserts users into "data"
			for (i = 0; i < rows.length; i++) {
				data.push(rows[i].username);
			}
			console.log(data);
			res.render('search/searchUsers', {
				users: data,
				style: 'search/search.css',
			});
		}
	);
});

module.exports = router;
