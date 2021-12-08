const jwt = require("jsonwebtoken");
const { User} = require("../models");

module.exports = {
  getAccessToken: async (req, res) => {
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
      const verified = jwt.verify(
        accessToken,
        process.env.ACCESS_SECRET,
        (err, decoded) => {
          if (err) return null;
          return decoded;
        }
      );
      if (!verified) {
        return res.status(401).json({
          data: null,
          error: {
            path: "/user/auth",
            message: "invalid accessToken",
          },
        });
      } else {
        const userData = User.findOne({
          where: {
            email: verified.email,
          },
          attributes: [
            "id",
            "nickname",
            "email",
            "isOauth",
            "isAdmin",
            "isEmailVerified",
          ],
        });
        if (!userData) {
          return res.status(404).json({
            data: null,
            error: "/user/auth",
            message: "user not found",
          });
        }
        return userData;
      }
    }
  },
};
