"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        nickname: "Hannah Vaughn",
        email: "tempus.lorem.fringilla@protonmail.ca",
        salt: 7010,
        password: "HDD83UTG6DL",
        isOauth: true,
        isAdmin: false,
      },
      {
        id: 2,
        nickname: "Isaac Shields",
        email: "massa.mauris@yahoo.edu",
        salt: 5593,
        password: "RQZ45PFV2XR",
        isOauth: true,
        isAdmin: false,
      },
      {
        id: 3,
        nickname: "Elijah Higgins",
        email: "ridiculus.mus@icloud.ca",
        salt: 4316,
        password: "BXQ61EIM0DS",
        isOauth: false,
        isAdmin: true,
      },
      {
        id: 4,
        nickname: "Joshua Hopkins",
        email: "felis.adipiscing@hotmail.couk",
        salt: 9273,
        password: "DIT03SXI3SE",
        isOauth: true,
        isAdmin: false,
      },
      {
        id: 5,
        nickname: "Halla Burns",
        email: "mauris@google.edu",
        salt: 8499,
        password: "VNP15JGJ5XS",
        isOauth: false,
        isAdmin: false,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
