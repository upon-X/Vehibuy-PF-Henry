const { Car } = require("../../db");
const { Op } = require("sequelize");

const filteredCars = async (
  brand,
  color,
  state,
  location,
  maxPrice,
  minPrice,
  model,
  name
) => {
  try {
    const conditions = {};

    if (maxPrice) {
      conditions.price = {
        [Op.gte]: maxPrice,
      };
    }

    if (minPrice) {
      if (conditions.price) {
        conditions.price[Op.lte] = minPrice;
      } else {
        conditions.price = {
          [Op.lte]: minPrice,
        };
      }
    }

    if (name) {
      conditions[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${name}%`, // Búsqueda de nombre insensible a mayúsculas y minúsculas
          },
        },
        {
          brand: {
            [Op.iLike]: `%${name}%`, // Búsqueda de marca insensible a mayúsculas y minúsculas
          },
        },
      ];
    }

    if (state === "New" || state === "Used") {
      conditions.state = state;
    }

    if (brand) {
      conditions.brand = {
        [Op.iLike]: `%${brand}%`, // Búsqueda de marca insensible a mayúsculas y minúsculas
      };
    }

    if (color) {
      conditions.color = {
        [Op.iLike]: `%${color}%`, // Búsqueda de marca insensible a mayúsculas y minúsculas
      };
    }

    if (model) {
      conditions.model = model; // Buscar autos con el modelo exacto proporcionado
    }

    if (location) {
      conditions.location = {
        [Op.iLike]: `%${location}%`, // Búsqueda de marca insensible a mayúsculas y minúsculas
      };
    }

    const filtersCar = await Car.findAll({
      where: conditions,
    })
    return filtersCar;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  filteredCars,
};
