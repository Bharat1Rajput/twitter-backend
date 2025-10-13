const express = require('express');
const { registerUser, loginUser} = require('../controller/authController');
const { registerValidation, loginValidation } = require('../validators/userValidation');
const handleValidationErrors = require('../middleware/validation');
const { loginLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
router.use(loginLimiter);
router.use(handleValidationErrors);

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

module.exports = router;