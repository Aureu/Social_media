const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const conn = require('../database');
const express = require('express');
const router = require('./register');
const userModel = require('../models/users');

// Zobrazení uživatelů
router.get('/users', async (req, res) => {
	const data = await userModel.getUsers();
	res.render('admin-users/user_list', {
		title: 'Userlist',
		style: 'user_list',
		users: data,
	});
});

router.get('/view/:id', async (req, res) => {
	var id = req.params.id;
	const data = await userModel.getUser(id);
	res.render('admin-users/view-user', {
		title: 'UserList',
		user: data,
	});
});

/* module.exports = {
	getUsers: function (req, res) {
		userModel.getUsers(function (data) {
			res.render('admin-users/user_list', {
				title: 'user list',
				userData: data,
			});
		});
	},
	getUser: function (req, res) {
		userModel.get_users(function (data) {
			res.render('admin-users/view-user', {
				title: 'UserList',
				user: data,
			});
		});
	},
	addUser: function (req, res) {
		res.render('add-user', {
			title: 'Add Users',
		});
	},
	insertUser: function (req, res) {
		const userDetails = req.body;
		userModel.addUser(userDetails, function (data) {
			res.redirect('/admin-users/user_list');
			console.log('User data is inserted successfully');
		});
	},
	deleteUser: function (req, res) {
		const deleteId = req.params.id;
		userModel.deleteUser(deleteId, function (data) {
			res.render('edit-user', { title: 'Update users', user: data });
		});
	},
	updateUser: function (req, res) {
		var user = req.body;
		var id = user.id;
		userModel.updateUser(user, id, function (data) {
			res.redirect('/admin-users/user_list');
			console.log('Data updated successfully');
		});
	},
};
 */
// Zobrazení jednoho uživatele

module.exports = router;
