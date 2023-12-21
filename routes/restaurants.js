const express = require('express');
const router = express.Router();
const restaurantsCtrl = require("../controllers/restaurants");
const ensureLoggedIn = require("../config/ensureLoggedIn");


router.get("/new", ensureLoggedIn, restaurantsCtrl.new);
router.get("/", ensureLoggedIn, restaurantsCtrl.index);
router.post("/", ensureLoggedIn, restaurantsCtrl.create);
router.get("/:id", ensureLoggedIn, restaurantsCtrl.show);


module.exports = router;
