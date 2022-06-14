const mysql = require('mysql');
const conn = require('../../database');
const express = require('express');
const router = express.Router();
const adminPostModel = require('../../models/adminPosts');
const profileModel = require('../../models/profile');

// Getting route for table with posts
router.get('/', async (req, res) => {
	const user_id = req.user.id;

	const data = await adminPostModel.getPosts();
	const profile = await profileModel.viewProfile(user_id);
	res.render('Admin/postTable/posts', {
		title: 'Posts',
		style: 'admin/users/userlist.css',
		profile: profile[0],
		posts: data,
	});
});

// Delete post by id
router.get('/delete/:id', async (req, res) => {
	const id = req.params.id;
	await adminPostModel.deletePost(id, function (data) {
		res.redirect('/admin/users');
	});
	res.redirect('back');
});

router.get('/comment/:id', async (req, res) => {
	const user_id = req.user.id;

	const id = req.params.id;
	const data = await adminPostModel.viewComments(id);
	const profile = await profileModel.viewProfile(user_id);
	res.render('Admin/postTable/comments', {
		title: 'Comments',
		style: 'admin/posts/comment.css',
		profile: profile[0],
		comments: data,
	});
});
module.exports = router;
