const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 18,
        max: 150,
      },
      allowNull: false,
    },
    country: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, isEmail: true },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, Infinity], // Mínimo 8 caracteres
          msg: "The password must be at least 8 characters long.",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://res.cloudinary.com/vehibuy/image/upload/q_auto/v1694066777/user_imgProfileStandar/istockphoto-903053114-612x612_qslxrv.webp",
    },
    tel: { type: DataTypes.STRING, allowNull: true },
    ban: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verify : { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, //
  },
  {
    timestamps: false,
  }
);
};
  
