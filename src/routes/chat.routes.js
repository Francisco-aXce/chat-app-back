const express = require('express');

const { tokenValidate } = require('../middlewares/auth');
const { createChat, sendMessage, editMessage, editChat, addUserToChat } = require('../controller/chat.controller');

const router = express.Router();

router.use(tokenValidate);

router.post('/create', createChat);
router.post('/edit', editChat);
router.post('/members/add', addUserToChat);
router.post('/messages/send', sendMessage);
router.post('/messages/edit', editMessage);

module.exports = router;