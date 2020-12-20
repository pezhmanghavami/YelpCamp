const { User } = require('../models/user');
const { sendEmail } = require('../utils/sendEmail');
const crypto = require("crypto");
const { clearCache } = require('ejs');

const renderRegister = (req, res) => {
    res.render('users/register');
}

const register = async (req, res, next) => {
    try {
        const { user: userData } = req.body;
        const user = new User({
            email: userData.email,
            username: userData.username,
            emailToken: crypto.randomBytes(64).toString("hex")
        });
        const registeredUser = await User.register(user, userData.password);
        const verifyAccURL = `http://${req.headers.host}/verify-email?token=${user.emailToken}`;
        sendEmail(email, verifyAccURL, "newUser");
        req.flash('Success', "Welcome to YelpCamp Please Verify Your email address to continue.");
        res.redirect('/');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ emailToken: req.query.token });
        if (user) {

        }
    } catch (e) {
        req.flash("error", e.message);
        res.redirect('/');
    }
}

const renderLogin = (req, res) => {
    res.render('users/login');
}

const login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

const logout = (req, res) => {
    req.logout();
    // req.session.destroy();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
}

module.exports = {
    renderLogin,
    renderRegister,
    register,
    verifyEmail,
    login,
    logout
}