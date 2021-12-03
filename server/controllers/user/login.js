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
      return res.status(204).json({
        data: null,
        error: {
          path: "/user/login",
          message: "user not found",
        },
      });
    }
    if (!passwordData.isEmailVerified) {
      return res.status(403).json({
        data: null,
        error: {
          path: "/user/login",
          message: "email verification required",
        },
      });
    }

    const { salt } = passwordData;
    const hashPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");
    if (passwordData.password === hashPassword) {
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
          expiresIn: "1h",
        }
      );
      res
        .cookie("accessToken", accessToken, {
          maxAge: 6 * 10 * 60, //1시간
        })
        .status(200)
        .end();
    } else {
      return res.status(401).json({
        data: null,
        error: {
          path: "/user/login",
          message: "unauthorized",
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
