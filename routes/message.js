const express = require('express');
const { sendMessage, getConversation, markAsRead } = require('../controller/dmController');
const auth = require('../middleware/auth');
const { validateMessage } = require('../validators/messageValidation');

const router = express.Router();

router.use(validateMessage);
router.post('/', auth, sendMessage);
router.get('/:userId', auth, getConversation);
router.put('/:messageId/read', auth, markAsRead);

module.exports = router;
