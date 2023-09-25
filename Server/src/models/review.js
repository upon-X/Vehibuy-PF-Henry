const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Review',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
            min: 1,
            max: 5
        }
      },
      title: {
        type: DataTypes.STRING(20),
        validate: {
         len: { 
          arg: [1, 20],
          msg: 'The title cannot exceed 20 characters'
        }
      }
      },
      review: {
        type: DataTypes.TEXT
      },
    },
    {
      timestamps: false,
    }
  );
};