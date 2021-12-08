const { getAccessToken } = require("../../utils/validation");
const { Post, User, sequelize } = require("../../models");
module.exports = {
  issueList: require("./issueList"),
  postList: require("./postList"),
  userList: require("./userList"),
  deleteById: async (req, res) => {
    const response = await getAccessToken(req, res);
    const { isAdmin } = response.dataValues.isAdmin;
    if (!isAdmin) {
      return res.status(403).json({
        data: null,
        error: {
          path: "/admin",
          message: "forbidden access",
        },
      });
    }
    const { postId, userId } = req.body;
    if (postId) {
      const postData = await Post.findAll({
        where: {
          id: postId,
        },
      });
      if (postData.length !== 0) {
        await Post.destroy({
          where: {
            id: postId,
          },
        });
        return res.status(204).end();
      }
      return res.status(400).json({
        data: null,
        error: {
          path: "/admin",
          message: "post not found",
        },
      });
    } else if (userId) {
      const userData = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (userData.length !== 0) {
        await User.destroy({
          where: {
            id: userId,
          },
        });
        return res.status(204).end();
      }
      return res.status(400).json({
        data: null,
        error: {
          path: "/admin",
          message: "user not found",
        },
      });
    } else {
      return res.status(400).json({
        data: null,
        error: {
          path: "/admin",
          message: "Insufficient body data",
        },
      });
    }
  },
};
