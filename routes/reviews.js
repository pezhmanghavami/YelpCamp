const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middlewares');
const reviews = require('../controllers/reviews');
const { wrapAsync } = require('../utils/wrapAsync');

router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, wrapAsync(isReviewAuthor), wrapAsync(reviews.deleteReview))

module.exports = router;