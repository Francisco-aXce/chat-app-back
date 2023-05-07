const express = require('express');

const { tokenValidate } = require('../middlewares/auth');
const {
    getChat, sendMessage, removeMessage,
} = require('../controller/chat.controller');

const router = express.Router();

router.use(tokenValidate);

router.get('/:userId', getChat);
router.post('/message/send', sendMessage);
router.delete('/message/remove', removeMessage);

module.exports = router;