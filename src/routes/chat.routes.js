const express = require('express');

const { tokenValidate } = require('../middlewares/auth');
const { createChat } = require('../controller/chat.controller');

const router = express.Router();

router.use(tokenValidate);

router.post('/create', createChat);

module.exports = router;