const express = require("express");
const router = express.Router();
const { upload, lists } = require("../controllers/chat");

router.post("/", upload);
router.get("/", lists);
module.exports = router;
