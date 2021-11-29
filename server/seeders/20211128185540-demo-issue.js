"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Issues",
      [
        {
          postId: 1,
          reporterId: 1,
          targetId: 2,
          content: "노쇼 시전함",
        },
        {
          postId: 1,
          reporterId: 2,
          targetId: 1,
          content: "연락두절",
        },
        {
          postId: 2,
          reporterId: 3,
          targetId: 4,
          content: "성의없음",
        },
        {
          postId: 3,
          reporterId: 2,
          targetId: 4,
          content: "1시간 지각함",
        },
        {
          postId: 5,
          reporterId: 4,
          targetId: 2,
          content: "일찍 떠남",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
