const router = require("express").Router();
const notAllowed = require('../errors/notAllowed');
const controller = require('./movies.controller');
const reviewsRouter = require("../reviews/reviews.router");

router.use("/:movieId/reviews", reviewsRouter)

router
    .route("/:movieId/theaters")
    .get(controller.getMovieTheaters) 
    .all(notAllowed)

router
    .route("/:movieId")
    .get(controller.read) 
    .all(notAllowed)

router
    .route("/")
    .get(controller.list)
    .all(notAllowed)

module.exports = router;