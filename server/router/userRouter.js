const express = require("express");
const router = express.Router();
const {
  auth,
  duplication,
  emailVerification,
  findPwVerification,
  info,
  kakao,
  login,
  logout,
  passwordVerification,
  signupVerification,
  signup,
  withdrawal,
  naverLogin,
} = require("../controllers/user");

router.get("/auth", auth);
router.get("/duplication", duplication);
router.post("/login", login);
router.post("/kakao", kakao);
router.post("/logout", logout);
router.patch("/info", info);
router.post("/signup", signup);
router.post("/signup-verification", signupVerification);
router.patch("/email-verification", emailVerification);
router.post("/findpw-verification", findPwVerification);
router.patch("/password-verification", passwordVerification);
router.delete("/withdrawal", withdrawal);
router.post('/naver-login', naverLogin)
module.exports = router;
