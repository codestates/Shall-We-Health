const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = async (req, res) => {
  const { email } = req.body;
  try {
    const loginData = await User.findOne({
      where: { email },
      attributes: ["email", "createdAt"],
    });
    if (loginData) {
      const accessToken = jwt.sign(
        loginData.dataValues,
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
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
