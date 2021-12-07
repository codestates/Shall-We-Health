const { Post } = require("../../models");
const { getAccessToken } = require("../../utils/validation");
module.exports = async (req, res) => {
  try {
    const { postId } = req.params;
    const { apply, cancel } = req.body;

    const response = await getAccessToken(req, res);
    const userId = response.dataValues.id;

    if (!apply && !cancel) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/post/:postId/match",
          message: "Insufficient body data",
        },
      });
    }
    //전달받은 postId에 해당하는 게시물이 있는지 확인하고(postId 유효성 확인), 예약날짜를 받아온다
    const postData = await Post.findOne({
      attributes: ["reserved_at"],
      where: {
        id: postId,
      },
    });
    //게시물의 예약날짜와 일치하는 다른 게시물을 업로드했거나 신청했다면 신청 제한한다
    if (postData) {
      const existingData = await Post.findAll({
        where: {
          reserved_at: postData.dataValues.reserved_at,
          [Op.or]: [{ hostId: userId }, { guestId: userId }],
          [Op.not]: [{ isMatched: 2 }],
        },
      });
      if (existingData) {
        return res.status(204).end();
      }
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
      } else {
        //userId가 없어서 existingData를 찾지 못했거나 userId&&apply를 실행하지 못한 경우
        return res.status(400).json({
          data: null,
          error: {
            path: "/post/:postId/match",
            message: "Insufficient body data",
          },
        });
      }
    }
    return res.status(400).json({
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
