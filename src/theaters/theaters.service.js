//Imports
const knex = require('../db/connection')

//Set global variable for the main table we're working with. 
const table = "theaters";

//This function appends a list of movies playing in theaters to each theater. 
async function getTheaterswithMovies(){

    //Collect "Theaters" and put in ascending order 
    let theaters = await knex(`${table} as t`)
    .orderBy("t.theater_id");

    //Collect the "Movies_Theaters" table and join with movies.
    //This returns a table of movies with theater IDs associated with them...
    //WHERE they are currently playing.  
    let movies_theaters = await knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.*")
    .where({"mt.is_showing": true});

    //For every theater,
    let theatersWithMovies = theaters.map((theater) => {
        //Create an array "Movies Match" that contains every movie that matches the current theater ID. 
        let moviesMatch = movies_theaters.filter((movie) => movie.theater_id === theater.theater_id)
        //Add that array to the end of the theater object we're working with.
        theater.movies = moviesMatch
        //Return our newly edited theater to "Theaters With Movies"
        return theater
    })

//Return our final data structure. 
  return theatersWithMovies
    

}

//This function gets resulting data from the function above and returns it to the Reviews Service. 
async function list(){
    let theatersWithMovies = await getTheaterswithMovies();
    return theatersWithMovies
}


//Exports
module.exports = {
    list
}