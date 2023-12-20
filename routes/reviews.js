const express = require('express');
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");


router.get("/new", reviewsCtrl.new);
router.post("/", reviewsCtrl.create);
router.get("/reviews", reviewsCtrl.index);


module.exports = router;
