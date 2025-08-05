const express = require('express');
const { registerUser, loginUser} = require('../controller/authController');
const { registerValidation, loginValidation } = require('../validators/userValidation');
const handleValidationErrors = require('../middleware/validation');

const router = express.Router();

router.post('/register', registerValidation, handleValidationErrors, registerUser);
router.post('/login', loginValidation, handleValidationErrors, loginUser);

module.exports = router;