//Imports
const router = require("express").Router();
const notAllowed = require('../errors/notAllowed');
const controller = require('./movies.controller');
const reviewsRouter = require("../reviews/reviews.router");

//Directs requests to this path to the Reviews Router, where it is easier to handle. 
router.use("/:movieId/reviews", reviewsRouter)

//Route for ('/movies/:movieId/theaters')
//Only GET is allowed for this route. 
router
    .route("/:movieId/theaters")
    .get(controller.getMovieTheaters) 
    .all(notAllowed)

//Rotue for ('/movies/:movieId')
//Only GET is allowed for this route.
router
    .route("/movies/:movieId")
    .get(controller.read) 
    .all(notAllowed)

//Route for ('/movies')
//Only GET is allowed for this route.
router
    .route("/")
    .get(controller.list)
    .all(notAllowed)

//Exports
module.exports = router;