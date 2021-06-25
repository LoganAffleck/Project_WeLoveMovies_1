const service = require('./theaters.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    let data = await service.list()
    res.json({data: data})
}

module.exports = {
    list: asyncErrorBoundary(list)
}