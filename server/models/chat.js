"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User, {
        foreignKey: "authorIds",
        as: "authorIds",
        onDelete: "CASCADE",
      });
      Chat.belongsTo(models.Post, {
        onDelete: "CASCADE",
      });
    }
  }
  Chat.init(
    {
      authorId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      content: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
