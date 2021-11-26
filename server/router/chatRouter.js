const express = require("express");
const router = express.Router();
const { create, message, lists } = require("../controllers/chat");

router.post("/", create);
router.post("/message", message);
router.get("/", lists);

module.exports = router;
