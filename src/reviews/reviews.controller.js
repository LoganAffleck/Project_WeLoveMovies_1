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

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Review cannot be found.`});
}

function hasValidFields(req, res, next) {
    const { data = {} } = req.body;

    const invalidFields = Object.keys(data).filter(
        (field) => !validFields.has(field)
    );

    if (invalidFields.length){
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
    };
    next();
}

async function read(req, res) {
    const data = await service.read(req.params.reviewId);
    res.json({ data });
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id : res.locals.review.review_id
    };
    const data = await service.update(updatedReview);
    res.json({ data });
}

async function destroy (req, res) {
    const data = await service.destroy(res.locals.review.review_id)
    res.status(204).json({ data })
}

//Exports
module.exports = {
    getMovieReviews: asyncErrorBoundary(getMovieReviews), 
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
    update: [
    asyncErrorBoundary(reviewExists), hasValidFields,
    asyncErrorBoundary(update)],
    destroy: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ]
}