const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { socialSignup } = require("../../utils/social");

module.exports = async (req, res) => {
  const { email, nickname, isOauth } = req.body;
  if (!email || !nickname || !isOauth) {
    return res.status(400).json({
      data: null,
      error: {
        path: "user/kakao",
        mesage: "Insufficient body data",
      },
    });
  }
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
        .cookie("accessToken", accessToken, {
          maxAge: 6 * 10 * 60 * 1000 * 3,
        }) // 3시간
        .status(200)
        .end();
    } else {
      /* 회원가입 안되어있을 때 */
      const socialUserData = await socialSignup(5, nickname, email, isOauth);
      if (socialUserData) {
        return res.status(201).end();
      }
      //   function makeId(length) {
      //     let result = "";
      //     let characters =
      //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      //     let charactersLength = characters.length;
      //     for (let i = 0; i < length; i++) {
      //       result += characters.charAt(
      //         Math.floor(Math.random() * charactersLength)
      //       );
      //     }
      //     return result;
      //   }
      //   let duplication = true;
      //   let randomSet = "";
      //   while (duplication) {
      //     randomSet = makeId(5);
      //     duplication = await User.findOne({
      //       where: { nickname: nickname + randomSet },
      //       attributes: ["email", "createdAt"],
      //     });
      //   }
      //   await User.create({
      //     email,
      //     isOauth,
      //     nickname: nickname + randomSet,
      //     isEmailVerified: 1,
      //   });
      //   return res.status(201).end();
      // }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
