const { User } = require('../models/user');
const { sendEmail } = require('../utils/sendEmail');
const crypto = require("crypto");

const renderRegister = (req, res) => {
    res.render('users/register');
}

const register = async (req, res) => {
    try {
        const { user: userData } = req.body;
        const user = new User({
            email: userData.email,
            username: userData.username,
            password: userData.password,
            emailToken: crypto.randomBytes(64).toString("hex")
        });
        await user.save();
        console.log(user);
        const verifyAccURL = `http://${req.headers.host}/verify-email?token=${user.emailToken}`;
        await sendEmail(user.email, verifyAccURL, "newUser");
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
            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            req.session.user_id = user._id;
            req.flash('success', `Welcome to Yelp Camp ${user.username}!`);
            await sendEmail(user.email, null, "emailVerified");
            return res.redirect('/campgrounds');

        }
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect('/');
    }
}

const renderLogin = (req, res) => {
    res.render('users/login');
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findAndValidate(username, password);
    if (user) {
        req.flash('success', 'welcome back!');
        const redirectUrl = req.session.returnTo || '/campgrounds';
        delete req.session.returnTo;
        req.session.user_id = user._id;
        return res.redirect(redirectUrl);
    } else {
        req.flash("error", "Your username/email or password is incorrect.");
        return res.redirect('/login');
    }
}

const logout = (req, res) => {
    //req.session.destroy();
    delete req.session.user_id
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