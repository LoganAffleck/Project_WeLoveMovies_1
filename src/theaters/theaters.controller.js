//Imports
const service = require('./theaters.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Requests list of theaters from Theaters Service. 
async function list(req, res, next){
    let data = await service.list()
    res.json({data: data})
}

//Exports
module.exports = {
    list: asyncErrorBoundary(list)
}