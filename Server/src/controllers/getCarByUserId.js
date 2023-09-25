const { where } = require('sequelize');
const { Car, Review, Brand, User } = require('../db');

const getCarByUserId = async (id) => {
    console.log(id)
    const carIdDb = await Car.findAll({
        where: {
            userId: id,
        }
    })
    if (!carIdDb) {
        return "Car not found";
    }
    return carIdDb;
};

module.exports = { getCarByUserId };