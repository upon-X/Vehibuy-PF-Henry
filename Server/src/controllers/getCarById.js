const { Car, Review, Brand, User } = require('../db');

const getCarById = async (id) => {

    const carIdDb = await Car.findByPk(id,
      {
        include: [
          {
            model: Review,
            attributes: ["id", "rating", "title", "review"],
            include: [
              {
                model: User,
                attributes: ["name", "lastName"]
              }
            ]
          }
      ]
    });
    if (!carIdDb) {
      return "Car not found";
    }
    return carIdDb;
  };

  module.exports = {getCarById};