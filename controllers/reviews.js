const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    const restaurant = await Restaurant.findById(req.params.id);
    req.body.restaurant = restaurant._id;
    try {
        const review = new Review(req.body);
        await review.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/restaurants/${restaurant._id}`)
}

async function deleteReview(req, res) {
    try {
        const review = await Review.findById(req.params.id);
        const restaurant = await Restaurant.findById(review.restaurant);
        await Review.findByIdAndDelete(req.params.id);
        restaurant.reviews = undefined;
        await restaurant.save();
        res.redirect(`/restaurants/${restaurant._id}`);
    } catch (err) {
        console.log(err);
    }
}

async function edit(req, res) {
    try {
        let reviews = await Review.findById(req.params.id);
        res.render("restaurants/update2", {reviews});
    } catch (err) {
        res.render("restaurants/show", {errMsg: err.message});
    }
}

async function update(req, res) {
    try {
        let reviews = await Review.findById(req.params.id);
        let restaurant = await Restaurant.findById(reviews.restaurant);
        reviews.date = req.body.date;
        reviews.rating = req.body.rating;
        reviews.description = req.body.description;
        await reviews.save();
        res.redirect(`/restaurants/${restaurant._id}`)
    } catch (err) {
        res.render("error", {errMsg: err.message});
    }
}

async function updateLike(req, res) {
    try {
        let reviews = await Review.findById(req.params.id);
        let restaurant = await Restaurant.findById(reviews.restaurant);
        reviews.likes += 1;
        await reviews.save();
        res.redirect(`/restaurants/${reviews.restaurant._id}`)
    } catch (err) {
        console.log(err);
        res.render("restaurants/show", {errMsg: err.message});
    }
}

async function updateDislike(req, res) {
    try {
        let reviews = await Review.findById(req.params.id);
        let restaurant = await Restaurant.findById(reviews.restaurant);
        reviews.dislikes += 1;
        await reviews.save();
        res.redirect(`/restaurants/${reviews.restaurant._id}`)
    } catch (err) {
        console.log(err);
        res.render("restaurants/show", {errMsg: err.message});
    }
}

module.exports = {
    create,
    delete: deleteReview, 
    edit,
    update, 
    updateLike, 
    updateDislike
}