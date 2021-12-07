const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../../models");
const { QueryTypes } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { token } = req.body
    const verified = jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) return null;
      return decoded;
    });


    // { email: 'sunyeong2222@gmail.com', iat: 1638472846, exp: 1638476446 }
    //1. 토큰을 해독했는데 유효하지 않았을 때
    //2. 유효한데 db에 저장된 이메일이 없을때

    if (!verified) {
      /* 토큰 해독이 안될 떄*/
      return res.status(404).json({
        data: null,
        error: {
          path: "/user/email-verification",
          message: "token fail verfied",
        },
      });
    } else {
      //해독된거로 DB찾기

      const { email } = verified
      const userEmail = await User.findOne({ where: { email }, attributes: ["email"] });


      if (!userEmail) {
        /* DB에 유저 정보가 없을 때*/
        return res.status(404).json({
          data: null,
          error: {
            path: "/user/email-verification",
            message: "token not found userInfo",
          },
        });
      } else {
        const sql = `update Users set isEmailVerified = 1 where email = "${email}";`
        const rows = await sequelize.query(sql, { type: QueryTypes.UPDATE });
        if (rows) {
          return res.status(200).json({ data: true });
        } else {
          return res.status(404).json({
            data: null,
            error: {
              path: "/user/email-verification",
              message: "page not found",
            },
          })
        }
      }
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
};

