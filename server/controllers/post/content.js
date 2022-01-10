const { Post } = require("../../models");
const { getAccessToken } = require("../../utils/validation");
module.exports = async (req, res) => {
  try {
    await getAccessToken(req, res);
    const { postId } = req.params;
    const { reserved_at, location, description } = req.body;
    console.log(req.body)
    console.log(req.params)
    if (!location || !description || !reserved_at) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/posts/:postId/content",
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
      await Post.update(
        {
          location,
          description,
          reserved_at,
        },
        {
          where: { id: postId },
        }
      );
      return res.status(200).json({
        data: postId
      });
    }
    return res.status(404).json({
      data: null,
      error: {
        path: "/posts/:postId/content",
        message: "post not found",
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
