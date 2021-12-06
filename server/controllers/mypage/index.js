const { QueryTypes } = require("sequelize");
const { Post, User, Thumbsup, sequelize } = require("../../models");
const { getAccessToken } = require("../../utils/validation");
module.exports = {
  lists: async (req, res) => {
    try {
      const { userId } = req.params;
      const resposne = await getAccessToken(req, res);
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
        if(response.dataValues.id === userData.dataValues.id) {
          const sql =
            "select post.hostId, hosts.nickname as hostNickname, post.guestId, guests.nickname as guestNickname, post.reserved_at, post.reserved_at, JSON_UNQUOTE( JSON_EXTRACT(location, '$.place_name') ) AS placeName, post.isMatched, (select exists (select giverId from Thumbsups as thumbsup where thumbsup.giverId= ? AND thumbsup.postId = post.id )) as thumbsup from Posts as post left join Users as hosts on post.hostId = hosts.id left join Users as guests on post.guestId = guests.id where guestId = ? OR hostId = ?";
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
      res.end();
    } catch (err) {
      throw err;
    }
  },
  recommend: async (req, res) => {
    try {
      res.end();
    } catch (err) {
      throw err;
    }
  },
  unrecommend: async (req, res) => {
    try {
      res.end();
    } catch (err) {
      throw err;
    }
  },
};
