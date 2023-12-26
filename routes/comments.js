const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/reviews/:id/new", ensureLoggedIn, commentsCtrl.new);
router.get("/:id/edit", ensureLoggedIn, commentsCtrl.edit);
router.post("/reviews/:id", ensureLoggedIn, commentsCtrl.createComment);
router.delete("/:id", ensureLoggedIn, commentsCtrl.delete);
router.put("/:id", ensureLoggedIn, commentsCtrl.update);
router.put("/:id/like", ensureLoggedIn, commentsCtrl.updateLike)
router.put("/:id/dislike", ensureLoggedIn, commentsCtrl.updateDislike)

module.exports = router;