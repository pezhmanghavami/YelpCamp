const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//we can have an array of the user's comments and posts
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    emailToken: {
        type: String,
        default: null,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    isPaid: {
        type: Boolean,
        default: false,
        select: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.statics.findAndValidate = async function (username, password) {
    const criteria = { $or: [{ username: username }, { email: username }, { mobile: username }, { anything: username }] };
    const foundUser = await this.findOne(criteria, "password");
    console.log(typeof (foundUser));
    if (foundUser) {
        const isValid = await bcrypt.compare(password, foundUser.password);
        if (isValid) {
            return { _id: foundUser._id };
        }
    }
    return false
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}