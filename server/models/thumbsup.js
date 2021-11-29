"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thumbsup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Thumbsup.belongsTo(models.Post, {
        onDelete: "SET NULL",
      });
      Thumbsup.belongsTo(models.User, {
        onDelete: "CASCADE",
      });
    }
  }
  Thumbsup.init(
    {
      postId: DataTypes.INTEGER,
      giverId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Thumbsup",
    }
  );
  return Thumbsup;
};
