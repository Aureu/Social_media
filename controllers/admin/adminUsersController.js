const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const conn = require('../../database');
const express = require('express');
const router = express.Router();
const userModel = require('../../models/adminUserlist');
const profileModel = require('../../models/profile');

// Displays users into table
router.get('/', async (req, res) => {
	const user_id = req.user.id;

	const data = await userModel.getUsers();
	const profile = await profileModel.viewProfile(user_id);

	res.render('Admin/userTable/userList', {
		title: 'Userlist',
		style: 'admin/users/userList.css',
		profile: profile[0],
		users: data,
	});
});

// Displays one user by id
router.get('/view/:id', async (req, res) => {
	const user_id = req.user.id;

	const profile = await profileModel.viewProfile(user_id);
	const id = req.params.id;
	const data = await userModel.getUser(id);
	res.render('Admin/userTable/viewUser', {
		title: 'UserList',
		style: 'followers/style.css',
		user: data[0],
		profile: profile[0],
	});
});

// Route for form for edit user
router.get('/edit/:id', async (req, res) => {
	const user_id = req.user.id;

	const id = req.params.id;
	const data = await userModel.editUser(id);
	const profile = await profileModel.viewProfile(user_id);

	res.render('Admin/userTable/editUser', {
		title: 'edit',
		style: 'admin/users/editUser.css',
		profile: profile[0],
		data: data[0],
	});
});

// Edit user by id
router.post('/edituser/:id', async (req, res) => {
	const { jmeno, prijmeni, prezdivka, email, heslo } = req.body;
	const id = req.params.id;
	const hashedPassword = await bcrypt.hash(heslo, 10);

	await userModel.updateUser(
		jmeno,
		prijmeni,
		prezdivka,
		email,
		id,
		hashedPassword,

		function (data) {
			console.log('data updated');
		},
		res.redirect('/admin/users')
	);
});

// Displays form for adding new user
router.get('/adduser', async (req, res) => {
	const user_id = req.user.id;

	const profile = await profileModel.viewProfile(user_id);

	res.render('Admin/userTable/addUser', {
		title: 'adduser',
		style: 'admin/users/addUser.css',
		profile: profile[0],
	});
});

// Adding new post to the DB
router.post('/add', async (req, res) => {
	try {
		const { jmeno, prijmeni, prezdivka, email, heslo } = req.body;
		const status = 'active';
		console.log(req.body);

		const hashedPassword = await bcrypt.hash(heslo, 10);
		userModel.addUser(
			jmeno,
			prijmeni,
			prezdivka,
			email,
			hashedPassword,
			status
		);
		res.redirect('/admin/users');
	} catch {
		res.redirect('/admin/adduser');
	}
});

// Delete users
router.get('/delete/:id', async (req, res) => {
	const id = req.params.id;
	await userModel.deleteUser(id, function () {
		res.redirect('/admin/users');
	});
	res.redirect('back');
});

module.exports = router;
