const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Sell', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    date: {
          type: DataTypes.DATE,
          allowNull: false,
      },  
    description: {
        type: DataTypes.TEXT,
      },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
    },
      {
        timestamps: false,
      }
    )
};
