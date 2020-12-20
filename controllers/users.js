const { User } = require('../models/user');
const { sendEmail } = require('../utils/sendEmail');

const renderRegister = (req, res) => {
    res.render('users/register');
}

const register = async (req, res, next) => {
    try {
        const { user: userData } = req.body;
        const user = new User({ email: userData.email, username: userData.username });
        const registeredUser = await User.register(user, userData.password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            sendEmail(email, "newUser");
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
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
    login,
    logout
}