const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = express.Router();
const postModel = require('../models/post');

// Adding new post data into the DB
router.post('/add-post', (req, res) => {
	const text = req.body.postMessage;
	user_id = req.user.id;
	username = req.user.username;
	postModel.addPost(text, user_id, username);
	res.redirect('back');
});

// Like a post - not done
router.post('/:id/act', (req, res, next) => {
	const action = req.body.action;
	const user_id = req.user.id;
	const post_id = req.params.id;
	const counter = action === 'Like' ? 1 : -1;
	postModel.likes(action, user_id, post_id);
	postModel.likeCount(post_id, counter);
});

router.get('/delete/:id', async (req, res) => {
	const id = req.params.id;
	console.log(id);
	await postModel.deletePost(id);
	res.redirect('back');
});

// comments - not done
router.post('/comment/:id', (req, res) => {
	const user_id = req.user.id;
	const post_id = req.params.id;
	const commentText = req.body.commentText;
	postModel.comment(user_id, post_id, commentText);
	res.redirect('back');
});
module.exports = router;
