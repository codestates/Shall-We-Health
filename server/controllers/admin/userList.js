const { Op, QueryTypes } = require("sequelize");
const { User, Post, sequelize } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { page, keyword } = req.query;
    const limit = 7;
    const indexOfLastPost = page * limit;
    const indexOfFirstPost = indexOfLastPost - limit;

    if (!page) {
      return res.status(400).json({
        data: null,
        error: "/admins/user-list",
        message: "Insufficient query",
      });
    }
    if (keyword) {
      const sql =
      "select Users.id, Users.email, Users.nickname, IFNULL(A.hostNum,0) AS hostNum, IFNULL(B.guestNum,0) AS guestNum from Users LEFT JOIN (SELECT hostId, COUNT(id) AS hostNum FROM Posts GROUP BY hostId) as A ON Users.id=A.hostId LEFT JOIN (SELECT guestId, COUNT(id) AS guestNum FROM Posts GROUP BY guestId) AS B ON Users.id=B.guestId Where Users.nickname like ? OR Users.email like ?";
    const rows = await sequelize.query(sql, { replacements: [`%${keyword}%`,`%${keyword}%`],type: QueryTypes.SELECT });
    const currentPosts = rows.slice(indexOfFirstPost, indexOfLastPost);

    if (rows) {
      return res.status(200).json({ data: currentPosts, count: rows.length });
    } else {
      return res.status(404).json({
        data: null,
        error: {
          path: "/admins/user-list",
          message: "page not found",
        },
      });
    }
  }else {
      const sql =
        "select Users.id, Users.email, Users.nickname, IFNULL(A.hostNum,0) AS hostNum, IFNULL(B.guestNum,0) AS guestNum from Users LEFT JOIN (SELECT hostId, COUNT(id) AS hostNum FROM Posts GROUP BY hostId) as A ON Users.id=A.hostId LEFT JOIN (SELECT guestId, COUNT(id) AS guestNum FROM Posts GROUP BY guestId) AS B ON Users.id=B.guestId";
      const rows = await sequelize.query(sql, { type: QueryTypes.SELECT });
      const currentPosts = rows.slice(indexOfFirstPost, indexOfLastPost);

      if (rows) {
        return res.status(200).json({ data: currentPosts, count: rows.length });
      } else {
        return res.status(404).json({
          data: null,
          error: {
            path: "/admins/user-list",
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
