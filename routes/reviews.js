const express = require("express");
const router = express.Router();
const restaurantsCtrl = require("../controllers/restaurants");
const ensureLoggedIn = require("../config/ensureLoggedIn");


router.post("/restaurants/:id/reviews", ensureLoggedIn, restaurantsCtrl.create);

module.exports = router;