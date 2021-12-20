const express = require("express");
const router = express.Router();
const {
  issueList,
  postList,
  userList,
  deleteById,
} = require("../controllers/admin");

router.get("/post-list", postList);
router.get("/user-list", userList);
router.get("/issue-list", issueList);
router.delete("/", deleteById);

module.exports = router;
