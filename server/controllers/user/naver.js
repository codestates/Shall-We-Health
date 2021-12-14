const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const axios = require("axios");

module.exports = async (req, res) => {
  const { token } = req.body;
  const userData = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { email, nickname } = userData.data.response;
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
        { expiresIn: "1h" }
      );

      res
        .cookie("accessToken", accessToken, { maxAge: 6 * 10 * 60 * 10000 }) // 1시간
        .status(200)
        .end();
    } else {
      /* 회원가입 안되어있을 때 */
      function makeId(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }

      let duplication = true
      while(duplication){
        var randomSet = await makeId(5)
        duplication = await User.findOne({
          where: { nickname: nickname+randomSet },
          attributes: ["email", "createdAt"],
        })
      }
      
      const newLoginData = await User.create({ email, isOauth, nickname : nickname+randomSet, isEmailVerified:1 });
      const accessToken = jwt.sign(
        newLoginData.dataValues,
        process.env.ACCESS_SECRET,
        { expiresIn: "1h" }
      );
      res
        .cookie("accessToken", accessToken, { maxAge: 6 * 10 * 60 * 10000 }) // 1시간
        .status(201)
        .end();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
