const knex = require('../db/connection')
const table = "theaters";

async function getTheaterswithMovies(){

    let theaters = await knex(`${table} as t`).orderBy("t.theater_id")
    let movies_theaters = await knex("movies_theaters as mt").join("movies as m", "m.movie_id", "mt.movie_id")

    let theatersWithMovies = theaters.map((theater) => {
        let moviesMatch = movies_theaters.filter((movie) => movie.theater_id === theater.theater_id)
        theater.movies = moviesMatch
        return theater
    })

  return theatersWithMovies
    

}

async function list(){
    let theatersWithMovies = await getTheaterswithMovies();
    return theatersWithMovies
}



module.exports = {
    list,
}