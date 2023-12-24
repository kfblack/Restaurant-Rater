const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const Comment = require("../models/comment");

async function createComment(req, res) {
    let review = await Review.findById(req.params.id);
    let restaurant = await Restaurant.findById(review.restaurant);
    try {
        let comment = new Comment(req.body);
        await review.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/restaurants/${restaurant._id}`);
}

async function newComment(req, res) {
    res.render("reviews/new", {errMsg: ""})
}

module.exports = {
    createComment, 
    new: newComment
}