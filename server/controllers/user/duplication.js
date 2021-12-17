const { Op } = require("sequelize");
const { User } = require("../../models");
module.exports = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        [Op.or]: [{ nickname: req.query.nickname }, { email: req.query.email }],
      },
    });


    if (data === null) {  // 중복X -> false 전달
      return res.status(200).json({ data: false });
    } else { //중복 O -> true
      return res.status(200).json({ data: true });
    }
  } catch (err) {
    throw err;
  }
};

