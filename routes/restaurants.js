const express = require('express');
const router = express.Router();
const restaurantsCtrl = require("../controllers/restaurants");
const ensureLoggedIn = require("../config/ensureLoggedIn");


router.get("/new", ensureLoggedIn, restaurantsCtrl.new);
router.get("/", ensureLoggedIn, restaurantsCtrl.index);
router.post("/", ensureLoggedIn, restaurantsCtrl.create);
router.get("/:id", ensureLoggedIn, restaurantsCtrl.show);
router.get("/:id/edit", ensureLoggedIn, restaurantsCtrl.edit);
router.put("/:id", ensureLoggedIn, restaurantsCtrl.update);
router.put("/:id/like", ensureLoggedIn, restaurantsCtrl.updateLike)
router.put("/:id/dislike", ensureLoggedIn, restaurantsCtrl.updateDislike)
router.delete("/:id", ensureLoggedIn, restaurantsCtrl.delete);


module.exports = router;
