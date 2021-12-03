const { Post } = require("../../models");
module.exports = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, apply, cancel } = req.body;
    if (!apply && !cancel) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/post/:postId/match",
          message: "Insufficient body data",
        },
      });
    }
    const postData = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (postData) {
      if (userId && apply) {
        await Post.update(
          {
            guestId: userId,
            isMatched: 1,
          },
          { where: { postId } }
        );
        return res.status(200).end();
      } else if (cancel) {
        await Post.update(
          {
            isMatched: 2,
          },
          {
            where: { postId },
          }
        );
        return res.status(200).end();
      }
    }
    return res.status(404).json({
      data: null,
      error: {
        path: "/post/:postId/match",
        message: "post not found",
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
