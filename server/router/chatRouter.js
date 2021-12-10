const express = require("express");
const router = express.Router();
const { create, lists } = require("../controllers/chat");

router.post("/", create);
router.get("/:postId", lists);

module.exports = router;
