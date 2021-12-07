const { Post } = require("../../models");
const { getAccessToken } = require("../../utils/validation");
module.exports = async (req, res) => {
  try {
    await getAccessToken(req, res);
    const { postId } = req.params;
    const { location, description } = req.query;
    if (!location || !description) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/post/:postId/content",
          message: "Insufficient queries",
        },
      });
    }
    const postData = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (postData) {
      if (location) {
        await Post.update(
          {
            location,
          },
          {
            where: { postId },
          }
        );
      }
      if (description) {
        await Post.update(
          {
            description,
          },
          {
            where: { postId },
          }
        );
      }
      return res.status(200).end();
    }
    return res.status(404).json({
      data: null,
      error: {
        path: "/post/:postId/content",
        message: "post not found",
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
