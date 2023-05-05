const express = require('express');

const { signup, signin } = require('../controller/auth.controller');

// Middlewares
const bodyCheck = require('../middlewares/bodyCheck');
const validSignup = require('../middlewares/validSignup');
const validSignin = require('../middlewares/validSignin');

const router = express.Router();

router.use(bodyCheck);

router.post('/signup', validSignup, signup);
router.post('/signin', validSignin, signin);

module.exports = router;