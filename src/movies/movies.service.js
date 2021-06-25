const knex = require("../db/connection");
const table = "movies";


//FUNCTIONS FOR ROOT ('/')

//Lists all movies in the database
function list(){
    return knex(table).select("*")
}

//Joins with the "Movies_Theaters" table to return a list of movies that are showing in theaters.
function listShowing(){
    return knex(`${table} as m`)
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .groupBy("m.title")
}

//--------------------

//FUNCTIONS FOR ('/:movieId')
function read(movieId){
    return knex(table)
    .select("*")
    .where({movie_id: movieId})
}

function getMovieTheaters(movieId){
    return knex(`${table} as m`)
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({"mt.is_showing": true, "mt.movie_id": movieId})
    
}



module.exports = {
    list,
    listShowing,
    read,
    getMovieTheaters,
  };