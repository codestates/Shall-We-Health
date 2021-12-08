const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = async (req, res) => {
  const { email, nickname, isOauth } = req.body;

  try {
    const loginData = await User.findOne({
      where: { email },
      attributes: ["email", "createdAt"],
    });


    if (loginData) {
      /* 회원가입이 되어있을 때 */

      const accessToken = jwt.sign(loginData.dataValues, process.env.ACCESS_SECRET, { expiresIn: "1h" });

      res.cookie("accessToken", accessToken, { maxAge: 6 * 10 * 60 * 10000 }) // 1시간
        .status(200)
        .end();
    } else {
      /* 회원가입 안되어있을 때 */
      await User.create({ email, isOauth, nickname, });
      return res.status(201).end();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
