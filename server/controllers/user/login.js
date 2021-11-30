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
      attributes: ["salt", "password"],
    });
    if (passwordData) {
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
          .json({
            data: {
              accessToken,
              userData: userData.dataValues,
            },
          });
      } else {
        return res.status(401).json({
          data: null,
          error: {
            path: "/users/login",
            message: "unauthorized",
          },
        });
      }
    } else {
      return res.status(404).json({
        data: null,
        error: {
          path: "/users/login",
          message: "user not found",
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
