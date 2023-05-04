const express = require('express');

const { create, find } = require('../controller/user.controller');

const router = express.Router();

router.post('/create', create);
router.get('/find', find);

module.exports = router;