const express = require('express');

const { tokenValidate } = require('../middlewares/auth');
const {
    createChat, editChat, getChat, getUserChats, addUserToChat, removeUserFromChat,
    sendMessage, editMessage,
} = require('../controller/chat.controller');

const router = express.Router();

router.use(tokenValidate);

router.post('/message/send', sendMessage);

// router.get('/', getUserChats);
// router.get('/:chatId', getChat);
// router.post('/create', createChat);
// router.put('/edit', editChat);
// router.post('/members/add', addUserToChat);
// router.delete('/members/remove', removeUserFromChat);
// router.post('/messages/send', sendMessage);
// router.put('/messages/edit', editMessage);

module.exports = router;