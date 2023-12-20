const Review = require("../models/review");

function newReview(req, res) {
    res.render("reviews/new", {errorMsg: ""})
}

async function create(req, res) {
    const reviews = await Review.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name; //is this stuff related to what I need? 
    req.body.userAvatar = req.user.avatar; 
    reviews.review.push(req.body);
    try {
        await reviews.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/reviews/${reviews._id}`);
}

async function index(req, res) {
    try {
        let reviews = await Review.find({});
        res.render("reviews/index", {reviews})
    } catch (err) {
        console.log(err);
        res.render("reviews/index", {errMsg: err.message});
    }
}


module.exports = {
    new: newReview,
    create, 
    index
}