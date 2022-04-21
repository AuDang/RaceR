'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.Album, {foreignKey: "albumId"})
    Photo.belongsTo(models.User, {foreignKey: "userId"})
    Photo.belongsTo(models.Comment, {foreignKey: "photoId"})
  };
  return Photo;
};