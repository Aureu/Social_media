const mysql = require('mysql');
const conn = require('../../database');
const express = require('express');
const router = express.Router();
const adminPostModel = require('../../models/adminPosts');

// Getting route for table with posts
router.get('/', async (req, res) => {
	const data = await adminPostModel.getPosts();
	res.render('Admin/postTable/posts', {
		title: 'Posts',
		style: 'userlist/userList.css',
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

module.exports = router;
