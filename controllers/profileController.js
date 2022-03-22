const mysql = require('mysql');
const conn = require('../database');
const express = require('express');
const router = require('./register');

router.get('/account', async (req, res) => {
	res.render('profile/profile', {
		title: 'User',
		style: 'profile/profilePage.css',
		jmeno: 'test', // Vkládat hodnoty uživatele
		prijmeni: 'test',
		prezdivka: 'test',
	});
});

router.get('/edit', async (req, res) => {
	res.render('profile/editProfile', {
		title: 'edit profile',
		style: 'profile/profilePage.css',
	});
});

module.exports = router;
