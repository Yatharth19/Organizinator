const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/', authController.getLogin);
router.post('/', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/dashboard', authController.getDashboard);
router.get('/logout', authController.getLogout)
module.exports = router