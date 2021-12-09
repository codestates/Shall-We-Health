const crypto = require("crypto");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const passwordData = await User.findOne({
      where: {
        email,
      },
      attributes: ["salt", "password", "isEmailVerified"],
    });

    if (!passwordData) {
      /* 이메일로 못 찾았을때 */
      return res.status(204).json({
        data: passwordData,
        error: {
          path: "/users/login",
          message: "wrong email",
        },
      });
    } else {
      /* 이메일은 맞음 */

      const { salt } = passwordData;
      const hashPassword = crypto
        .createHash("sha512")
        .update(password + salt)
        .digest("hex");

      if (passwordData.password !== hashPassword) {
        /* 이메일 맞음 비밀번호 틀림 */
        return res.status(204).json({
          data: null,
          error: {
            path: "/users/login",
            message: "wrong password",
          },
        });
      }


      if (!passwordData.dataValues.isEmailVerified) {
        /* 이메일 맞음 비밀번호 맞음 회원가입인증 안함 */
        return res.status(403).json({
          data: null,
          error: {
            path: "/user/login",
            message: "email verification required",
          },
        });
      }


      if (passwordData.password === hashPassword && passwordData.dataValues.isEmailVerified) {
        /* 이메일 맞음 비밀번호 맞음 회원가입인증 함 */
        const userData = await User.findOne({
          where: {
            email,
          },
          attributes: { exclude: ["salt", "password"] },
        });
        const accessToken = jwt.sign(
          userData.dataValues,
          process.env.ACCESS_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res
          .cookie("accessToken", accessToken)
          .status(200)
          .end();
      }
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
};