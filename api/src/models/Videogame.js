const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    plataformas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    imagen: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    fechaEstreno:{
      type: DataTypes.DATE,
      allowNull:false,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  });
};
