const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const { wrapAsync } = require('../utils/wrapAsync');
const { validateUser } = require('../middlewares');

router.route('/register')
    .get(users.renderRegister)
    .post(validateUser, wrapAsync(users.register));

router.get('/verify-email', wrapAsync(users.verifyEmail));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;