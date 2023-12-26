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

async function edit(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        res.render("restaurants/update3", {comment})
    } catch (err) {
        console.log(err);
    }
}

async function update(req, res) {
    try {
        let review = await Review.findOne({"comments": req.params.id});
        let restaurant = await Restaurant.findById(review.restaurant);
        await Comment.findByIdAndUpdate(req.params.id, {description: req.body.description});
        res.redirect(`/restaurants/${restaurant._id}`);
    } catch (err) {
        console.log(err);
    }
}

async function updateLike(req, res) {
    try {
        let reviews = await Review.findOne({"comments": req.params.id});
        let restaurant = await Restaurant.findById(reviews.restaurant);
        await Comment.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}});
        res.redirect(`/restaurants/${restaurant._id}`)
    } catch (err) {
        console.log(err);
    }
}

async function updateDislike(req, res) {
    try {
        let reviews = await Review.findOne({"comments": req.params.id});
        let restaurant = await Restaurant.findById(reviews.restaurant);
        await Comment.findByIdAndUpdate(req.params.id, {$inc: {dislikes: 1}});
        res.redirect(`/restaurants/${restaurant._id}`)
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createComment, 
    new: newComment,
    delete: deleteComment,
    edit,
    update, 
    updateLike,
    updateDislike
}