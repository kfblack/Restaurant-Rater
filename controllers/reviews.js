const Review = require("../models/review");

function newReview(req, res) {
    res.render("reviews/new", {errorMsg: ""})
}

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name; 
    req.body.userAvatar = req.user.avatar; 
    try {
        let response = await Review.create(req.body);
        res.redirect("/reviews");
    } catch (err) {
        console.log(err);
        res.redirect("/reviews/new");
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