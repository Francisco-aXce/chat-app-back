const express = require('express');

const { tokenValidate } = require('../middlewares/auth');
const { createChat, sendMessage, editMessage } = require('../controller/chat.controller');

const router = express.Router();

router.use(tokenValidate);

router.post('/create', createChat);
router.post('/message', sendMessage);
router.post('/message/edit', editMessage);

module.exports = router;