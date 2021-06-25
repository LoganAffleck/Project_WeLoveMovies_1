const service = require('./reviews.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getMovieReviews(req, res, next){
    let movieId = req.params.movieId;
    let data = await service.getMovieReviews(movieId);
    res.json({data: data});
}


module.exports = {
    getMovieReviews: asyncErrorBoundary(getMovieReviews)
}