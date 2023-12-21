const review = require("../models/review");

async function create(req, res) {
    const review = await Restaurant.findById(req.params.id);
    restaurant.review.push(req.body);
    try {
        await restaurant.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/restaurants/${restaurant._id}`)
}

module.exports = {
    create
}