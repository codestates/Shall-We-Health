const { QueryTypes } = require("sequelize");
const { Post, User, Thumbsup, sequelize, Issue } = require("../../models");
const { getAccessToken } = require("../../utils/validation");
module.exports = {
  lists: async (req, res) => {
    try {
      const { userId } = req.params;
      const response = await getAccessToken(req, res);
      //accessToken 확인완료
      //이제 전달받은 userId를 검증할 차례
      const userData = await User.findOne({
        where: {
          id: userId,
        },
        attributes: ["id"],
      });
      if (!userData) {
        return res.status(400).json({
          data: null,
          error: {
            path: "/mypage",
            message: "user not found",
          },
        });
      } else {
        if (response.dataValues.id === userData.dataValues.id) {
          const sql =
            "select post.hostId, hosts.nickname as hostNickname, post.guestId, guests.nickname as guestNickname, post.reserved_at, JSON_UNQUOTE( JSON_EXTRACT(location, '$.place_name') ) AS placeName, post.isMatched, (select exists (select giverId from Thumbsups as thumbsup where thumbsup.giverId= ? AND thumbsup.postId = post.id )) as thumbsup from Posts as post left join Users as hosts on post.hostId = hosts.id left join Users as guests on post.guestId = guests.id where guestId = ? OR hostId = ?";
          const postData = await sequelize.query(sql, {
            replacements: [userId, userId, userId],
            type: QueryTypes.SELECT,
          });
          return res.status(200).json({ data: postData });
        }
        return res.status(403).json({
          data: null,
          error: {
            path: "/post",
            message: "forbidden access",
          },
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  issue: async (req, res) => {
    try {
      const response = await getAccessToken(req, res);
      const userId = response.dataValues.id;
      const { targetId, content, postId } = req.body;

      const postData = await Post.findOne({
        where: {
          id: postId,
          [Op.or]: [{ hostId: targetId }, { guestId: targetId }],
        },
      });
      if (postData && content) {
        await Issue.create({
          postId,
          reporterId: userId,
          targetId,
          content,
        });
        return res.status(201).end();
      } else {
        return res.status(400).json({
          data: null,
          error: {
            path: "/mypage",
            message: "post not found",
          },
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  recommend: async (req, res) => {
    try {
      const response = await getAccessToken(req, res);
      const userId = response.dataValues.id;
      const { postId, receiverId } = req.body;

      //postId와 receiverId 유효성 확인
      const postData = await Post.findOne({
        where: {
          id: postId,
          [Op.or]: [{ hostId: receiverId }, { guestId: receiverId }],
        },
      });
      if (postData) {
        await Thumbsup.create({
          postId,
          giverId: userId,
          receiverId,
        });
        return res.status(201).end();
      } else {
        return res.status(400).json({
          data: null,
          error: {
            path: "/mypage",
            error: "post not found",
          },
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  unrecommend: async (req, res) => {
    try {
      const response = await getAccessToken(req, res);
      const userId = response.dataValues.id;
      const { postId, receiverId } = req.body;

      const thumbsupData = await Thumbsup.findAll({
        where: {
          postId,
          receiverId,
        },
      });
      if (thumbsupData) {
        await Thumbsup.destroy({
          where: {
            postId,
            giverId: userId,
            receiverId,
          },
        });
      } else {
        return res.status(400).json({
          data: null,
          error: {
            path: "/mypage",
            error: "thumbsup not found",
          },
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
