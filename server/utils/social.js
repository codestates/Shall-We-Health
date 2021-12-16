const { User } = require("../models");
module.exports = {
  socialSignup: async (length, nickname, email, isOauth) => {
    function makeId(length) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    let duplication = true;
    let randomSet = "";
    while (duplication) {
      randomSet = makeId(length);
      duplication = await User.findOne({
        where: { nickname: nickname + randomSet },
        attributes: ["email", "createdAt"],
      });
    }
    const socialUser = await User.create({
      email,
      isOauth,
      nickname: nickname + randomSet,
      isEmailVerified: 1,
    });
    return socialUser;
  },
};
