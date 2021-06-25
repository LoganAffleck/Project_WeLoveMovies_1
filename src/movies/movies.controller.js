//IMPORTS
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//MIDDLEWARE
//Uses the READ service to see if the movie ID given will return a non-empty result. 
async function movieExists(req, res, next) {
    let {movieId} = req.params;
    let data = await service.read(movieId);
    if (data.length){
        res.locals.movie = data
        return next();
    };
    return next({
        status: 404,
        message: "Movie cannot be found."
    });
};

//Root route functions ('/')
async function list(req, res) {
    
    let {is_showing} = req.query;
    
    //if the query of "is showing" is present and set to "true", use the List Showing service. 
    if(is_showing === 'true'){
        const data = await service.listShowing();
        return res.json({data});
    }

    //Otherwise, return all movies. 
    const data = await service.list();
    res.json({ data: data });
  }
//----------------------

//('/:movieId')
async function read(req, res, next){
    let data = res.locals.movie;
    res.json({data: data[0]});
}

//('/:movieId/theaters')
async function getMovieTheaters(req, res, next){
    let {movieId} = req.params;
    let data = await service.getMovieTheaters(movieId);
    res.json({data: data});
}
 
//Exports
module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    getMovieTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getMovieTheaters)]
  };