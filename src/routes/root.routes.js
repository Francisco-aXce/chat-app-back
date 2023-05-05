const express = require('express');

const { apiInfo } = require('../middlewares/api');
const { presentApi } = require('../controller/root.controller');

const router = express.Router();

router.get('/', apiInfo, presentApi);

module.exports = router;