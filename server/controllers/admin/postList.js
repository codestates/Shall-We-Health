const { Op } = require("sequelize");
const { User, sequelize } = require("../../models");
const { Post } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { page, nickname } = req.query;
    const limit = 7;
    const offset = (page - 1) * limit;
    const attributeOption = [
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
          sequelize.literal(`"$.address_name"`)
        ),
        "addressName",
      ],
      [
        sequelize.fn(
          "JSON_EXTRACT",
          sequelize.col("`location`"),
          sequelize.literal(`"$.place_name"`)
        ),
        "placeName",
      ],
    ];
    if (!page) {
      return res.status(404).json({
        data: null,
        error: "/users/post-list",
        message: "Insufficient query",
      });
    }
    if (nickname) {
      const { count, rows } = await Post.findAndCountAll({
        attributes: attributeOption,
        where: {
          [Op.or]: [
            {
              [`$guests.nickname$`]: {
                [Op.substring]: nickname,
              },
            },
            {
              [`$hosts.nickname$`]: {
                [Op.substring]: nickname,
              },
            },
          ],
        },
        include: [
          {
            model: User,
            as: "guests",
            attributes: [],
          },
          {
            model: User,
            as: "hosts",
            attributes: [],
          },
        ],
        offset,
        limit,
        order: [["createdAt", "ASC"]],
      });

      return res.status(200).json({ data: rows, count });
    }
    //검색한 닉네임이 없다면 모든 post를 보여주면 된다
    else {
      const { count, rows } = await Post.findAndCountAll({
        attributes: attributeOption,
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
