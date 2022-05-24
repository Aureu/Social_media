const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const conn = require('../../database');
const express = require('express');
const router = express.Router();
const userModel = require('../../models/adminUserlist');

// Zobrazení uživatelů
router.get('/', async (req, res) => {
	const data = await userModel.getUsers();
	res.render('Admin/userTable/userList', {
		title: 'Userlist',
		style: 'userlist/userList.css',
		users: data,
	});
});

// Zobrazí jednoho uživatele
router.get('/view/:id', async (req, res) => {
	var id = req.params.id;
	const data = await userModel.getUser(id);
	res.render('Admin/userTable/viewUser', {
		title: 'UserList',
		style: 'userlist/viewUser.css',
		user: data,
	});
});

// cesta na form pro úpravu uživatelů
router.get('/edit/:id', async (req, res) => {
	var id = req.params.id;
	const data = await userModel.editUser(id);
	res.render('Admin/userTable/editUser', {
		title: 'edit',
		style: 'userlist/editUser.css',
		user: data,
	});
});

// úprava uživatelů
router.post('/edituser/:id', async (req, res) => {
	const { jmeno, prijmeni, prezdivka, email, heslo } = req.body;

	var id = req.params.id;
	await userModel.updateUser(
		jmeno,
		prijmeni,
		prezdivka,
		email,
		id,
		function (data) {
			console.log('data updated');
		},
		res.redirect('/admin/users')
	);
});

// Přidávání nových uživatelů (form)
router.get('/adduser', (req, res) => {
	res.render('Admin/userTable/addUser', {
		style: 'userlist/addUser.css',
	});
});

// Přidávání nových uživatelů
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

// Mazání uživatelů
router.get('/delete/:id', async (req, res) => {
	const id = req.params.id;
	await userModel.deleteUser(id, function (data) {
		res.redirect('/admin/users');
	});
	res.redirect('back');
});

module.exports = router;
