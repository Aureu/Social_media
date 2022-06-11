const conn = require('../database');
const userProfileModel = require('../models/User');
const express = require('express');
const router = express.Router();
const counterModel = require('../models/counters');
const postModel = require('../models/post');
const profileModel = require('../models/profile');

// Shows user profile by username
router.get('/:id', async (req, res) => {
	const user_id = req.params.id;
	const data = await userProfileModel.getUser(user_id);
	const posts = await postModel.viewPost(user_id);
	const postCounter = await counterModel.postCounter(user_id);
	const followingCounter = await counterModel.followingCounter(user_id);
	const followersCounter = await counterModel.followersCounter(user_id);
	const id = req.user.id;
	const profile = await profileModel.viewProfile(id);

	res.render('userProfile/user', {
		title: 'User',
		style: 'profile/profilePage.css',
		userdata: data[0],
		profile: profile[0],
		posts: posts,
		postCounts: postCounter[0],
		followingCounts: followingCounter[0],
		followersCounts: followersCounter[0],
		user_id: req.user.id,
	});
});

// Following -- not done
router.post('/follow', (req, res, next) => {
	const followerId = req.user.id;
	const followedId = req.body.user_id;
	userProfileModel.follow(followerId, followedId);
});

router.post('/unfollow', (req, res, next) => {
	const followedId = req.body.user_id;
	userProfileModel.unFollow(followedId);
	res.redirect('back');
});

router.post('/:userId/posts/:postId/comment', (req, res) => {
	const user_id = req.params.userId;
	const post_id = req.params.postId;
	const commentText = req.body.commentText;
	postModel.comment(user_id, post_id, commentText);
	res.redirect('back');
});

router.post('/posts/:id', (req, res) => {
	console.log(req.params.id);
	const post_id = req.params.id;
	postModel.viewComments(post_id);
});

module.exports = router;
