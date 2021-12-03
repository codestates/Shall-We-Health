const { Op } = require("sequelize");
const { User, sequelize } = require("../../models");
const { Post } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { page, nickname } = req.query;
    const limit = 7;
    const offset = (page - 1) * limit;
    if (!page) {
      return res.status(404).json({
        data: null,
        error: "/users/post-list",
        message: "Insufficient query",
      });
    }
    if (nickname) {
      //Users테이블에서 nickname과 일치하는 Users.id 찾기
      const data1 = await User.findOne({
        attributes: ["id"],
        where: { nickname },
      });
      //console.log(data1.dataValues.id); //1
      //일치하는 id가 있다면
      if (data1) {
        //Posts테이블에서 가져온 id와 일치하는 게시물 가져오기(페이지네이션 적용)
        const { count, rows } = await Post.findAndCountAll({
          where: {
            [Op.or]: [
              { hostId: data1.dataValues.id },
              { guestId: data1.dataValues.id },
            ],
          },
          include: [
            { model: User, as: "guests", attributes: ["nickname"] },
            { model: User, as: "hosts", attributes: ["nickname"] },
          ],
          offset,
          limit,
          order: [["createdAt", "ASC"]],
        });
        if (rows) {
          return res.status(200).json({ data: rows, count });
        } else {
          return res.status(400).json({
            data: null,
            error: {
              path: "/users/admin",
              message: "Insufficient query",
            },
          });
        }
      }
      //일치하는 id가 없다면 (데이터베이스에 닉네임이 없단 듯)
      return res.status(404).json({
        data: null,
        error: "/users/post-list",
        message: "not found",
      });
    }
    //검색한 닉네임이 없다면 모든 post를 보여주면 된다
    else {
      const { count, rows } = await Post.findAndCountAll({
        attributes: [
          ["id", "postId"],
          "hostId",
          [sequelize.col("`hosts`.`nickname`"), "hostNickname"],
          "guestId",
          [sequelize.col("`guests`.`nickname`"), "guestNickname"],
          "reserved_at",
          "isMatched",
          [
            sequelize.fn(
              "JSON_EXTRACT",
              sequelize.col("`location`"),
              sequelize.literal(`"$.addressName"`)
            ),
            "addressName",
          ],
          [
            sequelize.fn(
              "JSON_EXTRACT",
              sequelize.col("`location`"),
              sequelize.literal(`"$.placeName"`)
            ),
            "placeName",
          ],
        ],
        include: [
          { model: User, as: "guests", attributes: [] },
          { model: User, as: "hosts", attributes: [] },
        ],
        offset,
        limit,
        order: [["createdAt", "ASC"]],
      });
      return res.status(200).json({ data: rows, count });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
