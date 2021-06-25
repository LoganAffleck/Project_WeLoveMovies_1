const router = require("express").Router();
const notAllowed = require('../errors/notAllowed');
const controller = require('./theaters.controller');

router
    .route('/')
    .get(controller.list)
    .all(notAllowed)

module.exports = router