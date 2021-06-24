const router = require("express").Router();
const notAllowed = require('../errors/notAllowed');
const controller = require('./movies.controller');

router
    .route("/:movieId")
    .get(controller.read) 
    .all(notAllowed)

router
    .route("/")
    .get(controller.list)
    .all(notAllowed)

module.exports = router;