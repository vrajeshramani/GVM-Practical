const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth.middleware');

const { signIn, signUp } = require('../controller/usres.controller');

// USERS ROUTES
router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports = router;
