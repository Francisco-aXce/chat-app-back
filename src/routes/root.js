const express = require('express');

const { sayHello } = require('../controller/root');

const router = express.Router();

router.get('/', sayHello);

module.exports = router;