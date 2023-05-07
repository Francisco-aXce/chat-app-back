const express = require('express');

const { tokenValidate } = require('../middlewares/auth');
const { createChat, sendMessage, editMessage, editChat, addUserToChat, removeUserFromChat } = require('../controller/chat.controller');

const router = express.Router();

router.use(tokenValidate);

router.post('/create', createChat);
router.put('/edit', editChat);
router.post('/members/add', addUserToChat);
router.delete('/members/remove', removeUserFromChat);
router.post('/messages/send', sendMessage);
router.put('/messages/edit', editMessage);

module.exports = router;