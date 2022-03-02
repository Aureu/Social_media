const conn = require('../database');

exports.login = (email) => {
	let sql = 'SELECT * FROM users WHERE email = ?';
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
