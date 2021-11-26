const express = require("express");
const router = express.Router();
const { upload, lists, list, match, content } = require("../controllers/post");

router.post("/", upload);
router.get("/:postId", list);
router.get("/", lists);
router.patch("/:postId/match", match);
router.patch("/:postId/content", content);

module.exports = router;
