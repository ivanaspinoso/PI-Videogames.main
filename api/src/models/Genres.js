const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Genres', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
