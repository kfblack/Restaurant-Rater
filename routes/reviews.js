const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");
const ensureLoggedIn = require("../config/ensureLoggedIn");


router.get("/reviews/:id/edit", ensureLoggedIn, reviewsCtrl.edit);
router.put("/reviews/:id", ensureLoggedIn, reviewsCtrl.update);
router.post("/restaurants/:id/reviews", ensureLoggedIn, reviewsCtrl.create);
router.delete("/reviews/:id", ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;