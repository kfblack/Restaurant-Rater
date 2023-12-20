const express = require('express');
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");


router.get("/new", reviewsCtrl.new);
router.get("/", reviewsCtrl.index);
router.post("/", reviewsCtrl.create);

module.exports = router;
