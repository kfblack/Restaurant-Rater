const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

function newRestaurant(req, res) {
    res.render("restaurants/new", {errorMsg: ""})
}

async function create(req, res) {
    try {
        await Restaurant.create(req.body);
        res.redirect("/restaurants");
    } catch (err) {
        console.log(err);
        res.redirect("/restaurants/new");
    }
}

async function index(req, res) {
    try {
        let restaurants = await Restaurant.find({});
        res.render("restaurants/index", {restaurants})
    } catch (err) {
        console.log(err);
        res.render("restaurants/index", {errMsg: err.message});
    }
}

async function show(req, res) {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        let reviews = await Review.find({restaurant: restaurant._id}).populate("comments");
        res.render("restaurants/show", {title: "Restaurant Reviews", restaurant, reviews});
    } catch (err) {
        res.render("restaurants/show", {errMsg: err.message});
    }
}

async function edit(req, res) {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        res.render("restaurants/update", {restaurant})
    } catch (err) {
        res.render("restaurants/show", {errMsg: err.message});
    }
}

async function update(req, res) {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        restaurant.name = req.body.name;
        restaurant.location = req.body.location;
        restaurant.hours = req.body.hours;
        await restaurant.save();
        res.redirect("/restaurants")
    } catch (err) {
        res.render("restaurants/show", {errMsg: err.message});
    }
}

async function deleteRestaurant(req, res) {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.redirect("/restaurants");
    } catch (err) {
        console.log(err);
    }
}

async function updateLike(req, res) {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        restaurant.likes += 1;
        await restaurant.save();
        res.redirect("/restaurants");
    } catch (err) {
        console.log(err);
        res.render("restaurants/show", {errMsg: err.message});
    }
}

async function updateDislike(req, res) {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        restaurant.dislikes += 1;
        await restaurant.save();
        res.redirect("/restaurants");
    } catch (err) {
        console.log(err);
        res.render("restaurants/show", {errMsg: err.message});
    }
}


module.exports = {
    new: newRestaurant,
    create, 
    index, 
    show, 
    edit, 
    update,
    delete: deleteRestaurant, 
    updateLike, 
    updateDislike
}