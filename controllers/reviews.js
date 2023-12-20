const Review = require("../models/review");

function newReview(req, res) {
    res.render("reviews/new", {errorMsg: ""})
}

async function create(req, res) {
    try {
        await Review.create(req.body);
        res.redirect("/reviews");
    } catch (err) {
        console.log(err);
        res.render("reviews/new", {errMsg: err.message});
    }
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