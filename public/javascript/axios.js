const likePost = (postId) => {
	axios
		.post('http://127.0.0.1:5000/posts/like', { post_id: postId })
		.then((response) => {
			window.location.reload();
		});
	console.log('click');
};

const deletePost = (postId) => {
	axios
		.post('http://127.0.0.1:5000/posts/delete', { post_id: postId })
		.then((response) => {
			window.location.reload();
		});
	console.log('click');
};

const followUser = (userId) => {
	axios
		.post('http://127.0.0.1:5000/user/follow', { user_id: userId })
		.then((response) => {
			window.location.reload();
		});
	console.log('click');
};

const unfollowUser = (userId) => {
	axios
		.post('http://127.0.0.1:5000/user/unfollow', { user_id: userId })
		.then((response) => {
			window.location.reload();
		});
	console.log('click');
};
