const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

function newRestaurant(req, res) {
    res.render("restaurants/new", {errorMsg: ""})
}

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
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
        if (!restaurant.likedBy.includes(req.user._id)) {
            restaurant.likes += 1;
            restaurant.likedBy.push(req.user._id);
            await restaurant.save();
        };
        res.redirect("/restaurants");
    } catch (err) {
        console.log(err);
        res.render("restaurants/show", {errMsg: err.message});
    }
}

async function updateDislike(req, res) {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant.dislikedBy.includes(req.user._id)) {
            restaurant.dislikes += 1;
            restaurant.dislikedBy.push(req.user._id);
            await restaurant.save();
        }
        res.redirect("/restaurants");
    } catch (err) {
        console.log(err);
        res.render("restaurants/show", {errMsg: err.message});
    }
}

async function search(req, res) {
    const searchResult = req.query.q;
    try {  
        const results = await Restaurant.find({$text: {$search: searchResult} });
        res.render("restaurants/results", {results})
    } catch (err) {
        console.log(err);
    }
}

async function showSpain(req, res) {
    try {
        const results = await Restaurant.find({location: {$regex: /Spain/i}});
        res.render("restaurants/spain", {results});
    } catch (err) {
        console.log(err);
    }
}

async function showGreece(req, res) {
    try {
        const results = await Restaurant.find({location: {$regex: /Greece/i}});
        res.render("restaurants/greece", {results});
    } catch (err) {
        console.log(err);
    }
}

async function showUSA(req, res) {
    try {
        const results = await Restaurant.find({location: {$regex: /U.S.A/i}});
        res.render("restaurants/usa", {results});
    } catch (err) {
        console.log(err);
    }
}

async function showCanada(req, res) {
    try {
        const results = await Restaurant.find({location: {$regex: /Canada/i}});
        res.render("restaurants/canada", {results});
    } catch (err) {
        console.log(err);
    }
}

async function showFrance(req, res) {
    try {
        const results = await Restaurant.find({location: {$regex: /France/i}});
        res.render("restaurants/france", {results});
    } catch (err) {
        console.log(err);
    }
}

async function showNear(req, res) {
    try { 
        let latitude = parseFloat(req.params.latitude);
        let longitude = parseFloat(req.params.longitude);
        const maxDistance = 0.06;
        const results = await Restaurant.find({
            lat: {
                $gte: latitude - maxDistance,
                $lte: latitude + maxDistance,
            },
            long: {
                $gte: longitude - maxDistance,
                $lte: longitude + maxDistance,
            },
        });
        res.render("restaurants/near", {results})
    } catch (err) {
        console.log(err);
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
    updateDislike,
    search, 
    showSpain, 
    showGreece,
    showUSA,
    showCanada,
    showFrance,
    showNear
}