const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const { wrapAsync } = require('../utils/wrapAsync');
const { validateUser, isVerified } = require('../middlewares');

router.route('/register')
    .get(users.renderRegister)
    .post(validateUser, wrapAsync(users.register));

router.get('/verify-email', wrapAsync(users.verifyEmail));

router.route('/login')
    .get(users.renderLogin)
    .post(wrapAsync(isVerified), wrapAsync(users.login));

router.get('/logout', users.logout);

module.exports = router;