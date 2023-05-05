const express = require('express');

const { signup, signin } = require('../controller/auth.controller');

// Middlewares
const { bodyCheck } = require('../middlewares/api');
const { validSignup, validSignin } = require('../middlewares/auth');

const router = express.Router();

router.use(bodyCheck);

router.post('/signup', validSignup, signup);
router.post('/signin', validSignin, signin);

module.exports = router;