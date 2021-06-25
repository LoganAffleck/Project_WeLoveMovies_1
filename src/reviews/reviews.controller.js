//Imports
const service = require('./reviews.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Responds to ('/:movieId/reviews') with a list of reviews associated with that movie ID. 
async function getMovieReviews(req, res, next){
    //Accesses the movie ID from the request parameters. 
    let movieId = req.params.movieId;
    let data = await service.getMovieReviews(movieId);
    res.json({data: data});
}

//Exports
module.exports = {
    getMovieReviews: asyncErrorBoundary(getMovieReviews)
}