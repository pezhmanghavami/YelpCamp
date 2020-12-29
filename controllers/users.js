const { User } = require('../models/user');
const { sendEmail } = require('../utils/sendEmail');
const crypto = require("crypto");
const { ExpressError } = require('../utils/ExpressError');

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
        // console.log(user);
        const verifyAccURL = `http://${req.headers.host}/verify-email?token=${user.emailToken}`;
        await sendEmail(user.email, verifyAccURL, "newUser");
        req.flash('success', "Welcome to YelpCamp Please Verify Your email address to continue.");
        res.redirect('/campgrounds');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            $and: [
                { emailToken: { $ne: null } },
                { emailToken: req.query.token }
            ]
        },//this fixes a bug that will send verification mail for the first user in db 
            //if the query string is empty
            "emailToken isVerified email username");
        //console.log(user);
        if (user) {
            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            req.session.user_id = user._id;
            req.flash('success', `Welcome to Yelp Camp ${user.username}!`);
            await sendEmail(user.email, null, "emailVerified");
            return res.redirect('/campgrounds');
        } else {
            req.flash('error', `This link doesn't exist.`);
            return res.redirect("/campgrounds");
        }
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect('/');
    }
}

const renderForgotPassword = (req, res) => {
    res.render('users/forgotPassword');
}

const forgotPassword = async (req, res, next) => {
    const username = req.body.username;
    if (username) {
        const criteria = { $or: [{ username: username }, { email: username }, { mobile: username }] };//Add mobile later
        const foundUser = await User.findOne(criteria, "email emailToken");
        if (foundUser) {
            foundUser.emailToken = crypto.randomBytes(64).toString("hex");
            await foundUser.save();
            const resetPasswordURL = `http://${req.headers.host}/reset-password?token=${user.emailToken}`;
            await sendEmail(user.email, resetPasswordURL, "forgotPassword");
        }
        req.flash('success', "If the entered info was correct an email has been sent to you.");
        return res.redirect("/campgrounds");
    } else {
        // req.flash("error", "You do not have permision to visit this page.");
        next(new ExpressError('You do not have permision to visit this page.', 403));
    }
}

const renderResetPassword = async (req, res) => {
    const token = req.query.token;
    if (token) {
        const user = await User.findOne({ emailToken: token });
        if (user) {
            res.render("users/resetPassword", { token });
        } else {
            req.flash('error', `This link doesn't exist.`);
            return res.redirect("/campgrounds");
        }
    } else {
        req.flash('error', `This link doesn't exist.`);
        return res.redirect("/campgrounds");
    }
}

const resetPassword = async (req, res) => {
    const token = req.query.token;
    if (token) {
        const user = await User.findOne({ emailToken: token }, "password email emailToken");
        if (user) {
            const newPassword = req.body.password;
            user.password = newPassword;
            emailToken = null;
            await user.save();
            req.session.user_id = user._id;
            req.flash("success", "Your password has been successfully changed. Welcome back!");
            await sendEmail(user.email, null, "passwordChanged");
            res.redirect("/campgrounds");
        } else {
            req.flash('error', `This link doesn't exist.`);
            return res.redirect("/campgrounds");
        }
    } else {
        // req.flash("error", "You do not have permision to visit this page.");
        next(new ExpressError('You do not have permision to visit this page.', 403));
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
    renderResetPassword,
    renderForgotPassword,
    register,
    verifyEmail,
    resetPassword,
    forgotPassword,
    login,
    logout
}