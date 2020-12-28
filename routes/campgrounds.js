const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const { wrapAsync } = require('../utils/wrapAsync');
const { isLoggedIn, isCampgroundAuthor, validateCampground } = require('../middlewares');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(wrapAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgrounds.createCampground));


router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(wrapAsync(campgrounds.showCampground))
    .put(isLoggedIn, wrapAsync(isCampgroundAuthor), upload.array('image'), validateCampground, wrapAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, wrapAsync(isCampgroundAuthor), wrapAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, wrapAsync(isCampgroundAuthor), wrapAsync(campgrounds.renderEditForm));



module.exports = router;