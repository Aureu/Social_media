const express = require('express');
const userController = require('./userController');
const db = require('../database');
const router = express.Router();

router.get('/user-list', userController.getUsers);
router.get('/view/:id', userController.getUser); /*
router.get('/add_form', userController.addUser);
router.post('/add', userController.insertUser);
router.get('/delete/:id', userController.deleteUser);
router.get('/edit/:id', userController.editUser);
router.all('/edit/update', userController.updateUser); */

module.exports = router;
