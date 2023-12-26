const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const Comment = require("../models/comment");

async function createComment(req, res) {
    let review = await Review.findById(req.params.id);
    let restaurant = await Restaurant.findById(review.restaurant);
    try {
        let comment = await Comment.create(req.body);
        review.comments.push(comment._id);
        await review.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/restaurants/${restaurant._id}`);
}

async function newComment(req, res) {
    res.render("restaurants/comments", {errMsg: "", reviewId: req.params.id})
}


async function deleteComment(req, res) {
    try {
        const review = await Review.findOne({'comments': req.params.id});
        let restaurant = await Restaurant.findById(review.restaurant);
        review.comments.pull(req.params.id);
        await review.save();
        await Comment.findByIdAndDelete(req.params.id);
        res.redirect(`/restaurants/${restaurant._id}`);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createComment, 
    new: newComment,
    delete: deleteComment,
}