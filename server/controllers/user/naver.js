const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { socialSignup } = require("../../utils/social");
const axios = require("axios");

module.exports = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({
      data: null,
      error: {
        path: "user/naver",
        message: "Insufficient body data",
      },
    });
  }
  const userData = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { email } = userData.data.response;
  const isOauth = 1;

  try {
    const loginData = await User.findOne({
      where: { email },
      attributes: ["email", "createdAt"],
    });

    if (loginData) {
      /* 회원가입이 되어있을 때 */
      const accessToken = jwt.sign(
        loginData.dataValues,
        process.env.ACCESS_SECRET,
        { expiresIn: "3h" }
      );

      res
        .cookie("accessToken", accessToken, { maxAge: 6 * 10 * 60 * 1000 * 3 }) // 3시간
        .status(200)
        .end();
    } else {
      /* 회원가입 안되어있을 때 */
      const newLoginData = await socialSignup(5, "", email, isOauth);
      console.log(newLoginData);
      const accessToken = jwt.sign(
        newLoginData.dataValues,
        process.env.ACCESS_SECRET,
        { expiresIn: "3h" }
      );
      res
        .cookie("accessToken", accessToken, { maxAge: 6 * 10 * 60 * 1000 * 3 }) // 3시간
        .status(201)
        .end();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
