//Imports
const knex = require('../db/connection')

//Set global variable for the main table we're working with. 
const table = "reviews";

//This returns the "Reviews" table. 
function list(){
    return knex(`${table}`)
    .select('*')
}

//This function appends the critic associated with the review to each review.
//Returns review{...critic{...}}
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

function getCritics(critic_id){
    return knex("critics")
    .select("*")
    .where({ critic_id })
    .first()
}
async function waitForCritics(reviewObject){
    const critic = await getCritics(reviewObject.critic_id)
    const combined = {...reviewObject, critic}
    return combined;
}
function readReviewCritics(review_id) {
    return knex(table)
    .select("*")
    .where({ review_id })
    .first()
    .then((data)=> waitForCritics(data))
}

//Function for ('/:movieId/reviews')
async function getMovieReviews(movieId){

    //Run the function that attaches the critics to reviews as required:
    let reviews = await getCriticsForReviews();

    //Filter through and return only the reviews that match the given movie ID.
    let matchingReviews = reviews.filter((review) => review.movie_id === Number(movieId) )

    return matchingReviews
}

function read(review_id) {
    return knex(table)
    .select("*")
    .where({ review_id })
    .first();
}

function update(updatedReview) {
    return knex(table)
        .join("critics", `${table}.critic_id`, "critics.critic_id")
        .where({ review_id: updatedReview.review_id})
        .update(updatedReview, "*")
        .then(()=> readReviewCritics(updatedReview.review_id))
  }

function destroy(review_id) {
    return knex(table).where({ review_id }).del()
}

//Exports 
module.exports = {
    list,
    getCriticsForReviews,
    getMovieReviews,
    read,
    update,
    destroy
}