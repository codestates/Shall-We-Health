const { Chat, User } = require("../../models");
const { getAccessToken } = require("../../utils/validation");

module.exports = {
  create: async (req, res) => {
    try {
      const userData = await getAccessToken(req, res);

      const userId = userData.dataValues.id;
      const { roomId, content } = req.body;

      if (!roomId) {
        console;
        return res.status(400).json({
          data: null,
          error: {
            path: "/chat",
            message: "Insufficient body data",
          },
        });
      }
      //채팅방 생성
      if (!content) {
        await Chat.create({
          authorId: userId,
          roomId,
        });
      }
      //메시지 생성
      await Chat.create({
        authorId: userId,
        roomId,
        content,
      });
      return res.status(201).end();
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  lists: async (req, res) => {
    try {
      // await getAccessToken(req, res);
      const { postId } = req.params;

      const { hostId, guestId } = req.query;
      if (!postId || !hostId || !guestId) {
        return res.status(400).json({
          data: null,
          error: {
            path: "/chat",
            message: "Insufficient body data",
          },
        });
      }

      const hostData = await User.findOne({
        attributes: ["nickname"],
        where: {
          id: hostId,
        },
      });
      const guestData = await User.findOne({
        attributes: ["nickname"],
        where: {
          id: guestId,
        },
      });
      const chatData = await Chat.findAll({
        attributes: ["authorId", "content", ["createdAt", "time"]],
        where: {
          roomId: postId,
        },
        Order: ["createdAt", "ASC"],
      });
      console.log(chatData);

      return res.status(200).json({
        hostNickname: hostData.dataValues.nickname,
        guestNickname: guestData.dataValues.nickname,
        data: chatData,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
