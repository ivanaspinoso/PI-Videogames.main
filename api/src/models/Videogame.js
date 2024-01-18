const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    released:{
      type: DataTypes.DATE,
      allowNull:false,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  });
};
