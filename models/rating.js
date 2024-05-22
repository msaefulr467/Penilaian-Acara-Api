"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  Rating.init(
    {
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      feedback: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
