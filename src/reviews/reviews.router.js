//Imports
const router = require("express").Router({mergeParams: true});
const notAllowed = require('../errors/notAllowed');
const controller = require('./reviews.controller');

//Router for (/reviews/:reviewId)
//Can GET, UPDATE, or DELETE the review given. 
router
    .route("/:reviewId")
    //.get(controller.read)
    //.put(controller.update)
    //.delete(controller.destroy)
    .all(notAllowed)

//Root Router for ('/reviews')
//Only GET is allowed at this route. 
router
    .route('/')
    .get(controller.getMovieReviews)
    .all(notAllowed)


//Exports
module.exports = router;
