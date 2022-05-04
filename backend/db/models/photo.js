'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.Album, {foreignKey: "albumId"})
    Photo.belongsTo(models.User, {foreignKey: "userId"})
    Photo.hasMany(models.Comment, {foreignKey: "photoId", onDelete:"CASCADE", hooks: true})
  };
  return Photo;
};