const router = require("express").Router({mergeParams: true});
const notAllowed = require('../errors/notAllowed');
const controller = require('./reviews.controller');

router
    .route('/')
    .get(controller.getMovieReviews)
    .all(notAllowed)

router
    .route("/:reviewId")
    //.get(controller.read)
    //.put(controller.update)
    //.delete(controller.destroy)


module.exports = router;
