const Restaurant = require("../models/restaurant");

function newRestaurant(req, res) {
    res.render("restaurants/new", {errorMsg: ""})
}

async function create(req, res) {
    // req.body.restaurant = req.restaurant._id;
    // req.body.user = req.user._id;
    // req.body.userName = req.user.name; 
    // req.body.userAvatar = req.user.avatar; 
    try {
        let response = await Restaurant.create(req.body);
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
        let restaurants = await Restaurant.findById(req.params.id);
        res.render("restaurants/show", {title: "Restaurant Reviews", restaurants});
    } catch (err) {
        res.render("restaurants/show", {errMsg: err.message});
    }
}


module.exports = {
    new: newRestaurant,
    create, 
    index, 
    show
}