if (process.env.USER) require("dotenv").config();

//GENERAL IMPORTS
const express = require("express");
const app = express();
const cors = require("cors")
//

//Handlers and Routers 
const errorHandler = require("./errors/errorHandler")
const notFound = require('./errors/notFound');
const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router')
const reviewsRouter = require('./reviews/reviews.router')
//

//Use JSON format for data return.
app.use(express.json());

//Use CORS to allow all incoming requests.
app.use(cors());

//Direct request based on URL
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

//Generate error "Not Found" for invalid URL path
app.use(notFound);

//Handle all request errors
app.use(errorHandler);

module.exports = app;
