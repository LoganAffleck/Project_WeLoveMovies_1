function notAllowed(request, response, next){
    next({
        status: 405,
        message: `${request.method} not allowed for ${request.originalUrl}`
    })
}

module.exports = notAllowed;