const express = require("express");
const router = express.Router();

const {
  lists,
  issue,
  recommend,
  unrecommend,
} = require("../controllers/mypage");

router.get("/:userId", lists);
router.post("/issue", issue);
router.post("/", recommend);
router.delete("/", unrecommend);

module.exports = router;
