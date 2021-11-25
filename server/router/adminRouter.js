const express = require("express");
const router = express.Router();
const {
  issueList,
  postList,
  userList,
  removePost,
  removeUser,
} = require("../controllers/admin");

router.get("/post-list", postList);
router.get("/user-list", userList);
router.get("/issue-list", issueList);
router.delete("/post", removePost);
router.delete("/user", removeUser);

module.exports = router;
