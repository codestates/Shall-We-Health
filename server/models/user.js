"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: "hostId",
        as: "hosts",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Post, {
        foreignKey: "guestId",
        as: "guests",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Issue, {
        foreignKey: "reporterId",
        as: "reports",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Issue, {
        foreignKey: "targetId",
        as: "targets",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Chat, {
        foreignKey: {
          name: "authorId",
        },
        onDelete: "CASCADE",
      });
      User.hasMany(models.Thumbsup, {
        foreignKey: "giverId",
        as: "givers",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Thumbsup, {
        foreignKey: "receiverId",
        as: "receivers",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING(100),
      nickname: DataTypes.STRING(100),
      salt: DataTypes.STRING(100),
      password: DataTypes.STRING(100),
      isOauth: { type: DataTypes.BOOLEAN, defaultValue: false },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
