const express = require('express');

const info = require('../middlewares/apiInfo');
const { presentApi } = require('../controller/root.controller');

const router = express.Router();

router.get('/', info, presentApi);

module.exports = router;