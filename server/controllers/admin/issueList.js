const { Issue, User, Post, sequelize, Sequelize } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 7;
    const offset = (page - 1) * limit;

    if (!page) {
      return res.status(400).json({
        data: null,
        error: "/admins/issue-list",
        message: "Insufficient query",
      });
    } else {
      const { count, rows } = await Issue.findAndCountAll({
        attributes: [
          "createdAt",
          [sequelize.col("`posts`.`reserved_at`"), "reserved_at"],
          [
            sequelize.fn(
              "JSON_EXTRACT",
              sequelize.col("`posts`.`location`"),
              sequelize.literal(`"$.address_name"`)
            ),
            "addressName",
          ],
          [
            sequelize.fn(
              "JSON_EXTRACT",
              sequelize.col("`posts`.`location`"),
              sequelize.literal(`"$.place_name"`)
            ),
            "placeName",
          ],
          "content",
          [sequelize.col("`reports`.`nickname`"), "reporter"],
          [sequelize.col("`targets`.`nickname`"), "target"],
        ],
        include: [
          {
            model: User,
            as: "reports",
            attributes: [],
          },
          {
            model: User,
            as: "targets",
            attributes: [],
          },
          {
            model: Post,
            as: "posts",
            attributes: [],
          },
        ],
        offset,
        limit,
        order: [["createdAt", "ASC"]],
      });
      if (rows) {
        return res.status(200).json({ data: rows, count });
      } else {
        return res.status(200).json({ data: null, count: 0 });
      }
    }
  } catch (err) {
    throw err;
  }
};
