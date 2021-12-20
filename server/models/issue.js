"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Issue.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "posts",
        onDelete: "CASCADE",
      });
      Issue.belongsTo(models.User, {
        foreignKey: "reporterId",
        as: "reports",
        onDelete: "CASCADE",
      });
      Issue.belongsTo(models.User, {
        foreignKey: "targetId",
        as: "targets",
        onDelete: "CASCADE",
      });
    }
  }
  Issue.init(
    {
      postId: DataTypes.INTEGER,
      reporterId: DataTypes.INTEGER,
      targetId: DataTypes.INTEGER,
      content: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: "Issue",
    }
  );
  return Issue;
};
