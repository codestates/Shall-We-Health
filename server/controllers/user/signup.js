const crypto = require("crypto");
const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { nickname, email, password, isOauth, isAdmin } = req.body;
    console.log(req.body)

    const salt = crypto.randomBytes(128).toString("base64");
    const hashPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");

    const data = await User.create({
      nickname,
      email,
      salt,
      password: hashPassword,
      isOauth,
      isAdmin,
    });

    if (data) {
      return res.status(201).end();
    } else {
      return res.status(400).json({
        data: null,
        error: {
          path: "/user/signup",
          message: "Insufficient body data",
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
