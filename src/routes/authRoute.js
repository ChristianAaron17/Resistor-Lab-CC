const express = require('express');
const { loginController, registerController, logoutController } = require('../controllers/authController');
const authToken = require('../middleware/authToken');
const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/logout', authToken, logoutController);

module.exports = router;
