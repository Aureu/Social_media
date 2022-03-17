const conn = require('../database');
// More nevím prostě to udělat do controlleru bruh
exports.login = (email) => {
	let sql = 'SELECT * FROM users WHERE email = ?';
	conn.query(sql, (err) => {
		if (err) throw err;
	});
};
