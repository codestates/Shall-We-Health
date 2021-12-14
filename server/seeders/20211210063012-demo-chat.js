"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Chats",
      [
        {
          authorId: 1,
          roomId: 1,
          content: "안녕하세요",
        },
        {
          authorId: 2,
          roomId: 1,
          content: "안녕하세요!!",
        },
        {
          authorId: 2,
          roomId: 1,
          content: "잘 부탁드립니다",
        },
        {
          authorId: 1,
          roomId: 1,
          content: "저도 잘 부탁드려요",
        },
        {
          authorId: 2,
          roomId: 1,
          content: "오늘 8시부터 2시간 하는건가요?",
        },
        {
          authorId: 1,
          roomId: 1,
          content: "네! 이따 8시에 봬요",
        },
        {
          authorId: 3,
          roomId: 2,
          content: "안녕하세요?",
        },
        {
          authorId: 4,
          roomId: 2,
          content: "안녕하세요:)",
        },
        {
          authorId: 1,
          roomId: 4,
          content: "저 오늘 사정이 생겨서 못할 것 같은데",
        },
        {
          authorId: 5,
          roomId: 4,
          content: "네?",
        },
        {
          authorId: 1,
          roomId: 4,
          content: "갑자기 급한일이 생겨서 취소해야할것같습니다.",
        },
        {
          authorId: 1,
          roomId: 4,
          content: "죄송합니다",
        },
        {
          authorId: 5,
          roomId: 4,
          content: "아.. 네 알겠습니다",
        },
        {
          authorId: 4,
          roomId: 5,
          content: "안녕하세요",
        },
        {
          authorId: 4,
          roomId: 5,
          content: "확인하시면 연락 부탁드려요",
        },
        {
          authorId: 2,
          roomId: 5,
          content: "확인이 늦었네요",
        },
        {
          authorId: 2,
          roomId: 5,
          content: "안녕하세요, 오늘 5시에 뵙겠습니다",
        },
        {
          authorId: 4,
          roomId: 5,
          content: "네! 이따봬요",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Chats", null, {});
  },
};
