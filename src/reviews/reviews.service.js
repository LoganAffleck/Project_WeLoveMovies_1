const knex = require('../db/connection')
const table = "reviews";

function list(){
    return knex(`${table}`)
    .select('*')
}

async function getCriticsForReviews(){
    //Retrieve the Reviews and Critics tables:
    let reviews = await list();
    let critics = await knex("critics")
    //Map the critics object to the reviews. 
    let mapCritic = reviews.map((review)=>{
        //For every critic, locate the first critic that matches the critic ID in the review. 
        let critic = critics.find((critic) => critic.critic_id === review.critic_id);
        //Attach that critic to a new key of "review"
        review.critic = critic
        //return the new review! 
        return review
    })
    return mapCritic
}

//Function for ('/:movieId/reviews')
async function getMovieReviews(movieId){

    //Run the middleware function that attaches the critics and reviews as required:
    let reviews = await getCriticsForReviews();

    //filter through and return only the reviews that match the given movie ID.
    let matchingReviews = reviews.filter((review) => review.movie_id === Number(movieId) )

    return matchingReviews
}

module.exports = {
    list,
    getCriticsForReviews,
    getMovieReviews
}