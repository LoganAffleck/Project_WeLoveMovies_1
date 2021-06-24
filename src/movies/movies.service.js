const knex = require("../db/connection");

//FUNCTIONS FOR ROOT ('/')

//Lists all movies in the database
function list(){
    return knex("movies").select("*")
}

//Joins with the "Movies_Theaters" table to return a list of movies that are showing in theaters.
function listShowing(){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
    .where({"mt.is_showing": true})
    .groupBy("m.title")
}

//--------------------

//FUNCTIONS FOR ('/:movieId')
function read(){
    
}

module.exports = {
    list,
    listShowing
  };