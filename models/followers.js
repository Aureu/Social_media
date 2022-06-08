const conn = require('../database');

exports.viewFollowers = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT followed_id FROM followers WHERE follower_id = '${user_id}'`;
			conn.query(sql, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
