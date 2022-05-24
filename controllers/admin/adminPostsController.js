const mysql = require('mysql');
const conn = require('../../database');
const express = require('express');
const router = express.Router();
const adminPostModel = require('../../models/adminPosts');

router.get('/', async (req, res) => {
	const data = await adminPostModel.getPosts();
	res.render('Admin/postTable/posts', {
		title: 'Posts',
		style: 'userlist/userList.css',
		posts: data,
	});
});

// Mazání prispevku
router.get('/delete/:id', async (req, res) => {
	const id = req.params.id;
	await adminPostModel.deletePost(id, function (data) {
		res.redirect('/admin/users');
	});
	res.redirect('back');
});

module.exports = router;
