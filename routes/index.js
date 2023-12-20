const express = require('express');
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Restaurant Rater' })
})


module.exports = router;
