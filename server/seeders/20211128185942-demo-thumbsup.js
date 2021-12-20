"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Thumbsups",
      [
        {
          postId: 1,
          giverId: 1,
          receiverId: 2,
        },
        {
          postId: 1,
          giverId: 2,
          receiverId: 1,
        },
        {
          postId: 2,
          giverId: 3,
          receiverId: 4,
        },
        {
          postId: 3,
          giverId: 4,
          receiverId: 2,
        },
        {
          postId: 4,
          giverId: 5,
          receiverId: 1,
        },
        {
          postId: 5,
          giverId: 2,
          receiverId: 4,
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
