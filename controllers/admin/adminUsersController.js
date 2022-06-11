const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const conn = require('../../database');
const express = require('express');
const router = express.Router();
const userModel = require('../../models/adminUserlist');

// Displays users into table
router.get('/', async (req, res) => {
	const data = await userModel.getUsers();
	res.render('Admin/userTable/userList', {
		title: 'Userlist',
		style: 'admin/users/userList.css',
		users: data,
	});
});

// Displays one user by id
router.get('/view/:id', async (req, res) => {
	const id = req.params.id;
	const data = await userModel.getUser(id);
	res.render('Admin/userTable/viewUser', {
		title: 'UserList',
		style: 'userlist/viewUser.css',
		user: data[0],
	});
});

// Route for form for edit user
router.get('/edit/:id', async (req, res) => {
	const id = req.params.id;
	const data = await userModel.editUser(id);
	res.render('Admin/userTable/editUser', {
		title: 'edit',
		style: 'admin/users/editUser.css',
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
router.get('/adduser', (req, res) => {
	res.render('Admin/userTable/addUser', {
		style: 'admin/users/addUser.css',
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
