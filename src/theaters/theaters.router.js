//Imports
const router = require("express").Router();
const notAllowed = require('../errors/notAllowed');
const controller = require('./theaters.controller');

//Root router for ('/theaters')
//Only GET is allowed at this router. 
router
    .route('/')
    .get(controller.list)
    .all(notAllowed)

//Exports
module.exports = router