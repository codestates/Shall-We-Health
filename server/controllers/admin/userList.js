const { Op, QueryTypes } = require("sequelize");
const { User, Post, sequelize } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { page, keyword } = req.query;
    const limit = 7;
    const offset = (page - 1) * limit;

    if (!page) {
      return res.status(404).json({
        data: null,
        error: "/admin/user-list",
        message: "Insufficient query",
      });
    }
    if (keyword) {
      const { count, rows } = await User.findAndCountAll({
        where: {
          [Op.or]: [
            { email: { [Op.substring]: keyword } },
            { nickname: { [Op.substring]: keyword } },
          ],
        },
        attributes: [
          "id",
          "email",
          "nickname",
          [
            sequelize.fn("count", sequelize.col("`hosts`.`hostId`")),
            "hostNum",
          ],
          [
            sequelize.fn("count", sequelize.col("`guests`.`isMatched`")),
            "guestNum",
          ],
        ],
        group: ["User.id"],

        include: [
          { model: Post, as: "hosts", attributes: [] },
          {
            model: Post,
            as: "guests",
            attributes: [],
            where: {
              isMatched: 1,
            },
            required: false,
          },
        ],
      });
      return res.status(200).json({ data: rows, count: rows.length });
    } else {
      const sql =
        "select Users.id, Users.email, Users.nickname, IFNULL(A.hostNum,0) AS hostNum, IFNULL(B.guestNum,0) AS guestNum from Users LEFT JOIN (SELECT hostId, COUNT(id) AS hostNum FROM Posts GROUP BY hostId) as A ON Users.id=A.hostId LEFT JOIN (SELECT guestId, COUNT(id) AS guestNum FROM Posts GROUP BY guestId) AS B ON Users.id=B.guestId";
      const rows = await sequelize.query(sql, { type: QueryTypes.SELECT });
      const indexOfLastPost = page * limit;
      const indexOfFirstPost = indexOfLastPost - limit;
      const currentPosts = rows.slice(indexOfFirstPost, indexOfLastPost);

      if (rows) {
        return res.status(200).json({ data: currentPosts, count: rows.length });
      } else {
        return res.status(404).json({
          data: null,
          error: {
            path: "/admin/user-list",
            message: "page not found",
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
