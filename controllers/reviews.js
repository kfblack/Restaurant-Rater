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

module.exports = {
    create
}