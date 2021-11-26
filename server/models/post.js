"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      hostId: DataTypes.INTEGER,
      guestId: DataTypes.INTEGER,
      reserved_at: DataTypes.DATE,
      isMatched: { type: DataTypes.BOOLEAN, defaultValue: false },
      location: DataTypes.JSON,
      description: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
