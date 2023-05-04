const express = require('express');

const { create, find } = require('../controller/controller');

const router = express.Router();

router.post('/create', create);
router.post('/find', find);

module.exports = router;