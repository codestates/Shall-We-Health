"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Thumbsups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          key: "id",
          as: "PostId",
        },
      },
      giverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "giverId",
        },
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "receiverId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Thumbsups");
  },
};
