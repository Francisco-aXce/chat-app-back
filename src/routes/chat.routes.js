const express = require('express');

const { tokenValidate } = require('../middlewares/auth');
const {
    getChat, sendMessage, removeMessage,
    createChatGroup,
} = require('../controller/chat.controller');

const router = express.Router();

router.use(tokenValidate);

// 1:1 chat
router.get('/:userId', getChat);
router.post('/message/send', sendMessage);
router.delete('/message/remove', removeMessage);

// 1:n chat
router.post('/group/create', createChatGroup);

module.exports = router;