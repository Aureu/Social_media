const conn = require('../database');

exports.viewFollowing = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM followers AS f JOIN viewuser AS u  ON f.followed_id = u.id WHERE f.follower_id = ?`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};

exports.viewFollowers = (user_id) => {
	return new Promise((resolve, reject) => {
		try {
			let sql = `SELECT * FROM followers AS f JOIN viewuser AS u  ON f.follower_id = u.id WHERE f.followed_id = ?`;
			conn.query(sql, user_id, (error, results) => {
				if (error) throw error;
				resolve(results);
			});
		} catch (err) {
			reject(err);
		}
	});
};
