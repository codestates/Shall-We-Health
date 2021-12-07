const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const crypto = require("crypto");


module.exports = async (req, res) => {
  try {
    const { token, password } = req.body
    const verified = jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) return null;
      return decoded;
    });


    if (!verified) {
      /* 토큰 해독이 안될 떄*/
      return res.status(404).json({
        data: null,
        error: {
          path: "/user/password-verification",
          message: "token fail verfied",
        },
      });
    }
    else {
      // 해독된거로 DB찾기
      const { email } = verified
      const userEmail = await User.findOne({ where: { email }, attributes: ["email"] });


      if (!userEmail) {
        /* DB에 유저 정보가 없을 때*/
        return res.status(404).json({
          data: null,
          error: {
            path: "/user/password-verification",
            message: "token not found userInfo",
          },
        });
      } else {
        const salt = crypto.randomBytes(128).toString("base64");
        const hashPassword = crypto
          .createHash("sha512")
          .update(password + salt)
          .digest("hex");

        await User.update(
          { salt, password: hashPassword },
          {
            where: {
              email,
            },
          }
        );
        return res.status(200).json({ data: true });
      }
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
};

