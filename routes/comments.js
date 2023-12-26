const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/reviews/:id/new", ensureLoggedIn, commentsCtrl.new);
router.post("/reviews/:id", ensureLoggedIn, commentsCtrl.createComment);
router.delete("/:id", ensureLoggedIn, commentsCtrl.delete);

module.exports = router;