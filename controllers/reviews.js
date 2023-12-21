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

module.exports = {
    create,
    delete: deleteReview
}