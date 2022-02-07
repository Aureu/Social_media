const conn = require('../database');

exports.login = (email) => {
	let sql = `SELECT * FROM users WHERE prezdivka = '${prezdivka}'`;
	db.query(sql, (err) => {
		if (err) throw err;
	});
};
