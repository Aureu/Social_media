const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes pro userController

// Zobrazení všech uživatelý z DB do tabulky
router.get('/user_list', userController.view);
// Editování uživatelů
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
// Zobrazení jednotlivého uživatele
router.get('/viewuser/:id', userController.view_user);
// Přidání uživatele
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
// Smazání uživatele
router.get('/delete/:id', userController.delete);

module.exports = router;
