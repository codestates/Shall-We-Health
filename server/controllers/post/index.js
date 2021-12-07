const { Op, QueryTypes } = require("sequelize");
const { Post, User, sequelize } = require("../../models");
const { getAccessToken } = require("../../utils/validation");
module.exports = {
  upload: async (req, res) => {
    try {
      const response = await getAccessToken(req, res);
      const userId = response.dataValues.id;
      const { reserved_at, location, description } = req.body;

      if (userId && reserved_at && location && description) {
        //동일한 날짜에 이미 업로드(호스트) 또는 신청한(게스트) 내역이 있다면, 신청제한
        const existingData = await Post.findAll({
          where: {
            [Op.substring]: [{ reserved_at }],
            [Op.or]: [{ hostId: userId }, { guestId: userId }],
            [Op.not]: [{ isMatched: 2 }],
          },
        });
        if (existingData) {
          return res.status(204).end();
        }
        await Post.create({
          hostId: userId,
          reserved_at,
          location,
          description,
        });
        return res.status(201).end();
      }
      return res.status(400).json({
        data: null,
        error: {
          path: "/post",
          message: "Insufficient body data",
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  lists: async (req, res) => {
    try {
      const { date, location, page, isMatched, keyword } = req.query;
      const limit = 15;
      let rows;
      if (!page || !location || !date) {
        return res.status(400).json({ data: null });
      }

      if (!keyword && !isMatched) {
        //모든 게시물 다 불러오기 (예약날짜, 장소, 페이지에 따른 필터링은 적용됨)
        const sql =
          "SELECT reserved_at, isMatched, description, JSON_UNQUOTE( JSON_EXTRACT(location, '$.address_name') ) AS addressName, JSON_UNQUOTE( JSON_EXTRACT(location, '$.place_name') ) AS placeName FROM Posts WHERE reserved_at LIKE ? AND JSON_UNQUOTE( JSON_EXTRACT(location, '$.address_name') ) LIKE ? ORDER BY reserved_at";
        rows = await sequelize.query(sql, {
          replacements: [`${date}%`, `${location}%`],
          type: QueryTypes.SELECT,
        });
      }
      if (isMatched && !keyword) {
        //신청가능한 게시물 다 불러오기
        const sql =
          "SELECT reserved_at, isMatched, description, JSON_UNQUOTE( JSON_EXTRACT(location, '$.address_name') ) AS addressName, JSON_UNQUOTE( JSON_EXTRACT(location, '$.place_name') ) AS placeName FROM Posts WHERE reserved_at LIKE ? AND JSON_UNQUOTE( JSON_EXTRACT(location, '$.address_name') ) LIKE ? AND isMatched = ? ORDER BY reserved_at";
        rows = await sequelize.query(sql, {
          replacements: [`${date}%`, `${location}%`, 0],
          type: QueryTypes.SELECT,
        });
      } else if (isMatched && keyword) {
        //신청가능한 게시물 중 키워드로 필터링된 게시물 불러오기
        const sql =
          "SELECT * FROM (SELECT reserved_at, isMatched, description, JSON_UNQUOTE( JSON_EXTRACT(location, '$.address_name') ) AS addressName, JSON_UNQUOTE( JSON_EXTRACT(location, '$.place_name') ) AS placeName FROM Posts WHERE reserved_at LIKE ? AND JSON_UNQUOTE( JSON_EXTRACT(location, '$.address_name') ) LIKE ? AND isMatched = ?) AS Filtered WHERE Filtered.placeName LIKE ? OR Filtered.addressName LIKE ? ORDER BY Filtered.reserved_at";
        rows = await sequelize.query(sql, {
          replacements: [
            `${date}%`,
            `${location}%`,
            0,
            `%${keyword}%`,
            `%${keyword}%`,
          ],
          type: QueryTypes.SELECT,
        });
      } else if (!isMatched && keyword) {
        //모든 게시물 중 키워드로 필터링된 게시물 불러오기
        const sql =
          "SELECT * FROM (SELECT reserved_at, isMatched, description, JSON_UNQUOTE( JSON_EXTRACT(location, '$.address_name') ) AS addressName, JSON_UNQUOTE( JSON_EXTRACT(location, '$.place_name') ) AS placeName FROM Posts WHERE reserved_at LIKE ? AND JSON_UNQUOTE( JSON_EXTRACT(location, '$.address_name') ) LIKE ?) AS Filtered WHERE Filtered.placeName LIKE ? OR Filtered.addressName LIKE ? ORDER BY Filtered.reserved_at";
        rows = await sequelize.query(sql, {
          replacements: [
            `${date}%`,
            `${location}%`,
            `%${keyword}%`,
            `%${keyword}%`,
          ],
          type: QueryTypes.SELECT,
        });
      }
      const indexOfLastPost = page * limit;
      const indexOfFirstPost = indexOfLastPost - limit;
      const currentPosts = rows.slice(indexOfFirstPost, indexOfLastPost);
      return res.status(200).json({ data: currentPosts, count: rows.length });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  list: async (req, res) => {
    try {
      const { postId } = req.params;
      const postData = await Post.findOne({
        attributes: [
          "hostId",
          "guestId",
          [sequelize.col("`hosts`.`nickname`"), "hostNickname"],
          [sequelize.col("`guests`.`nickname`"), "guestNickname"],
          "reserved_at",
          "isMatched",
          "location",
          "description",
        ],
        include: [
          {
            model: User,
            as: "hosts",
            attributes: [],
            required: true,
          },
          {
            model: User,
            as: "guests",
            attributes: [],
            required: true,
          },
        ],
        where: {
          id: postId,
        },
      });
      const sql =
        "SELECT COUNT(id) as hostThumbsups FROM Thumbsups INNER JOIN (SELECT hostId FROM Posts WHERE Posts.id = ?) as Host ON Thumbsups.receiverId = Host.hostId";

      const hostThumbsups = await sequelize.query(sql, {
        replacements: [postId],
        type: QueryTypes.SELECT,
      });
      return res.status(200).json({
        data: [postData, hostThumbsups[0]],
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  remove: async (req, res) => {
    try {
      const { postId, hostId } = req.body;
      await getAccessToken(req, res);
      //올바른 accessToken 확인완료
      //이제 전달받은 postId와 hostId를 검증할 차례
      const postData = await Post.findOne({
        where: {
          id: postId,
        },
        attributes: ["hostId"],
      });
      //postId가 없거나 일치하는 게시물이 없는 경우
      if (!postData) {
        return res.status(400).json({
          data: null,
          error: {
            path: "/post",
            message: "post not found",
          },
        });
      } else {
        //전달받은 postId와 일치하는 게시물(postData)을 찾은 경우
        //postData에서 받아온 hostId와 전달받은 hostId가 일치하는 경우(게시물 작성자가 유저가 맞는 경우)
        if (postData.dataValues.hostId === hostId) {
          await Post.destroy({
            where: {
              id: postId,
            },
          });
          return res.status(204).end();
        }
        //postData에서 받아온 hostId와 전달받은 hostId가 불일치하는 경우(게시물 작성자가 유저가 아닌 경우)
        else {
          return res.status(403).json({
            data: null,
            error: {
              path: "/post",
              message: "forbidden access",
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  content: require("./content"),
  match: require("./match"),
};
