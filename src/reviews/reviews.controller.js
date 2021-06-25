const service = require('./reviews.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getMovieReviews(req, res, next){
    let movieId = req.params.movieId
    console.log(movieId)
    res.sendStatus(200)
}


module.exports = {
    getMovieReviews: asyncErrorBoundary(getMovieReviews)
}