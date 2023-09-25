require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Brand, Buy, Car, Review, User, Sell } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Car.hasMany(Review, { foreignKey: 'carId' });
Review.belongsTo(Car, { foreignKey: 'carId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Car, { foreignKey: 'userId' });
Car.belongsTo(User, { foreignKey: 'userId' });

Brand.hasMany(Car, { foreignKey: 'brandId' });
Car.belongsTo(Brand, { foreignKey: 'brandId' });

Car.belongsToMany(Sell, { through: "carSells" });
Sell.belongsToMany(Car, { through: "carSells" });

Car.belongsToMany(Buy, { through: "carBuys" });
Buy.belongsToMany(Car, { through: "carBuys" });

Sell.belongsTo(Buy, { foreignKey: "buySellId" });
Buy.belongsTo(Sell, { foreignKey: "buySellId" });

User.hasMany(Buy, { foreignKey: "userId" });
Buy.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
