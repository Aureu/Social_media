const likePost = (postId) => {
	/* 	$(document).ready(function () {
		var btn = document.getElementById('likeBtn');
		btn.disabled = true;
	}); */
	axios
		.post('http://127.0.0.1:5000/posts/like', { post_id: postId })
		.then((response) => {
			alert('liked');
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
	/* 	$(document).ready(function () {
		var btn = document.getElementById('likeBtn');
		btn.disabled = true;
	});
 */
	axios
		.post('http://127.0.0.1:5000/user/follow', { user_id: userId })
		.then((response) => {
			alert('Začal si sledovat uživatele');
			window.location.reload();
		});
	console.log('click');
};

const unfollowUser = (userId) => {
	axios
		.post('http://127.0.0.1:5000/user/unfollow', { user_id: userId })
		.then((response) => {
			alert('Přestal si sledovat uživatele');
			window.location.reload();
		});
	console.log('click');
};

const viewComments = (postId) => {
	axios
		.post('http://127.0.0.1:5000/posts/viewcomments', { post_id: postId })
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let comments = data;
			console.log(comments);
		});
};
