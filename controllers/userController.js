const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connection = require('../database');
const express = require('express');
const router = require('./register');
const Users = require('../models/users');

router.get('/users', async (req, res) => {
	const data = await Users.view();
	res.render('admin-users/user_list', {
		title: 'Userlist',
		style: 'user_list',
		users: data,
	});
});

module.exports = router;
