const express = require("express");
const router = express.Router();
const {
  upload,
  lists,
  list,
  match,
  content,
  remove,
} = require("../controllers/post");

router.post("/", upload);
router.get("/:postId", list);
router.get("/", lists);
router.patch("/:postId/match", match);
router.patch("/:postId/content", content);
router.delete("/", remove);

module.exports = router;
