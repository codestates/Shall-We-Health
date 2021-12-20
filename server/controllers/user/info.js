const { User } = require("../../models");
const crypto = require("crypto");
module.exports = async (req, res) => {
  try {
    const { newPassword, email, nickname } = req.body;
    //비밀번호 변경
    if (email && newPassword) {
      const salt = crypto.randomBytes(128).toString("base64");
      const hashPassword = crypto
        .createHash("sha512")
        .update(newPassword + salt)
        .digest("hex");
      await User.update(
        { salt, password: hashPassword },
        {
          where: {
            email,
          },
        }
      );
    }
    //닉네임 변경
    if (email && nickname) {
      await User.update(
        {
          nickname,
        },
        {
          where: {
            email,
          },
        }
      );
    } else if ((!nickname && !newPassword) || !email) {
      return res.status(400).json({
        error: {
          path: "/user/info",
          message: "Insufficient body data",
        },
      });
    }
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
