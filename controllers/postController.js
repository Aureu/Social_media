const express = require('express');
const router = express.Router();
const profileModel = require('../models/profile');
const postModel = require('../models/post');
const counterModel = require('../models/counters');

// Adding new post data into the DB
router.post('/add-post', (req, res) => {
	const text = req.body.postMessage;
	user_id = req.user.id;
	username = req.user.username;
	postModel.addPost(text, user_id, username);
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

router.post('/delete', async (req, res) => {
	const post_id = req.body.post_id;
	console.log('deleted');
	await postModel.deletePost(post_id);
	res.redirect('back');
});

router.post('/like', (req, res) => {
	console.log('liked');
	const user_id = req.user.id;
	const post_id = req.body.post_id;
	postModel.like(user_id, post_id);
	res.redirect('back');
});

// Zobrazeni komentu
router.post('/viewcomments/:id', async (req, res) => {
	const post_id = req.params.id;
	console.log('clicked' + post_id);
	const comments = await postModel.viewComment(post_id);
	const user_id = req.user.id;
	const profile = await profileModel.viewProfile(user_id);
	const data = await postModel.vPost(post_id);

	res.render('profile/comments', {
		title: 'Comments',
		style: 'profile/profilePage.css',
		// Variables that takes user info from sesssion
		profile: profile[0],
		posts: data,
		comments: comments,
	});
	console.log(data);
	console.log(comments);
});
module.exports = router;
