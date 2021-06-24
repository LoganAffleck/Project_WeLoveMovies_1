const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//MIDDLEWARE
async function movieExists(req, res, next) {
    let {movieId} = req.params;
    console.log(movieId);
    //check if movieId exists in the database
}

//Root route functions
async function list(req, res) {
    
    let {is_showing} = req.query

    if(is_showing === 'true'){
        const data = await service.listShowing()
        console.log(data.length)
        return res.json({data})
    }

    const data = await service.list();
    res.json({ data: data });
  }
//----------------------

//('/:movieId') route functions 
async function read(req, res, next){
    const data = await service.read();

}


  
module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  };