//Imports
const knex = require("../db/connection");

//Global variable for main table we're working with. 
const table = "movies";


//FUNCTIONS FOR ROOT ('/')

//Lists all movies in the database
function list(){
    return knex(table).select("*")
}

//Joins with the "Movies_Theaters" table 
//to return a list of movies that are showing in theaters.
function listShowing(){
    return knex(`${table} as m`)
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .groupBy("m.title")
}

//--------------------

//FUNCTIONS FOR ('/:movieId')

//Returns movies that match the ID given. 
function read(movieId){
    return knex(table)
    .select("*")
    .where({movie_id: movieId})
}

//Joins with the "Movies_Theaters" and "Theaters" tables 
//to return a list of theaters that are showing the given movie ID. 
function getMovieTheaters(movieId){
    return knex(`${table} as m`)
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({"mt.is_showing": true, "mt.movie_id": movieId})
    
}

//Exports
module.exports = {
    list,
    listShowing,
    read,
    getMovieTheaters,
  };