const { User } = require("../../models");
const { getAccessToken } = require("../../utils/validation");
module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const userId = response.dataValues.id;
    await User.destroy({
      where: {
        id: userId,
      },
    });
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
