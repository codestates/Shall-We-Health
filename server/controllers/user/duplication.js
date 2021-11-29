const { Op } = require("sequelize");
const { user } = require("../../models");
module.exports = async (req, res) => {
  try {
    const data = await user.findOne({
      where: {
        [Op.or]: [{ nickname: req.query.nickname }, { email: req.query.email }],
      },
    });
    if (data === null) {
      return res.status(200).json({ data: false });
    } else {
      return res.status(404).json({ data: true });
    }
  } catch (err) {
    throw err;
  }
};
