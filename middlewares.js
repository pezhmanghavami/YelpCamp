const { campgroundJoiSchema, reviewJoiSchema, userJoiSchema } = require('./joiSchemas.js');
const { ExpressError } = require('./utils/ExpressError');
const { Campground } = require('./models/campground');
const { Review } = require('./models/review');
const { User } = require('./models/user.js');
const crypto = require("crypto");
const { sendEmail } = require('./utils/sendEmail');

const validateCampground = (req, res, next) => {
    const { error } = campgroundJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const validateUser = (req, res, next) => {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

const isCampgroundAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

const isVerified = async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        console.log(user.isVerified);
        if (user.isVerified) {
            //user.isVerified = false;
            //await user.save();
            return next();
        }
        if (user.emailToken == null) {
            user.emailToken = crypto.randomBytes(64).toString("hex");
            await user.save();
            const verifyAccURL = `http://${req.headers.host}/verify-email?token=${user.emailToken}`;
            await sendEmail(user.email, verifyAccURL, "newUser");
            req.flash("error", "Please verify Your Email Address to Login.");
            return res.redirect('/login');
        } else {
            req.flash("error", "Please verify Your Email Address to Login; An email has already been sent to you.");
            return res.redirect('/login');
        }
    } catch (e) {
        req.flash("error", "isVerified BROKE.");
        console.log(e.message);
        res.redirect('/login');
    }
}

module.exports = {
    validateUser,
    validateReview,
    validateCampground,
    isLoggedIn,
    isVerified,
    isReviewAuthor,
    isCampgroundAuthor
}