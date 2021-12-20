const jwt = require("jsonwebtoken");
const { User } = require("../../models");
module.exports = async (req, res) => {
  try {
    const { accessToken } = req.cookies;


    if (!accessToken) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/user/auth",
          message: "no accessToken",
        },
      });
    } else {
      const verified = jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) return null;
        return decoded;
      });

      //accessToken은 있지만 해독되지 않는 경우
      if (!verified) {
        return res.status(401).json({
          data: null,
          error: {
            path: "/user/auth",
            message: "invalid accessToken",
          },
        });
      } else {

        const userData = await User.findOne({
          where: { email: verified.email, },
          attributes: [
            "id",
            "nickname",
            "email",
            "isOauth",
            "isAdmin",
            "isEmailVerified",
          ],
        });

        //accessToken있고, 해독되었지만 일치하는 정보가 DB에 없는 경우
        if (!userData) {
          return res.status(404).json({
            data: null,
            error: "/user/auth",
            message: "user not found",
          });
        } else {
          const { id, nickname, email, isOauth, isAdmin, isEmailVerified } = userData.dataValues;
          return res.status(200).json({
            data: {
              isLogin: true,
              decoded: {
                id,
                nickname,
                email,
                isOauth,
                isAdmin,
                isEmailVerified,
              },
            },
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
