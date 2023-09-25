const { Car } = require("../db");

const allCar = async () => {
  try {
    const allCars = await Car.findAll();
    return allCars;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { allCar };
