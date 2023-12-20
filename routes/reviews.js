const express = require('express');
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");
const ensureLoggedIn = require("../config/ensureLoggedIn");


router.get("/new", ensureLoggedIn, reviewsCtrl.new);
router.get("/", ensureLoggedIn, reviewsCtrl.index);
router.post("/", ensureLoggedIn, reviewsCtrl.create);

module.exports = router;
