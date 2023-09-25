const { Car } = require('../db');
const { Op } = require('sequelize');

const carNameController = async (name) => {
    try {
      // console.log(name);
      const carNameDb = await Car.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        }
      })
      
      return carNameDb;
    } catch (error) {
      return "Car not found";
    }
  };

  module.exports = {carNameController,};