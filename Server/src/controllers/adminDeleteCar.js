const { Car } = require("../db");

const adminDeleteCarController = async (id) => {
  // const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la ruta
    // Busca el usuario por ID
    const car = await Car.findOne({
      where: {
        id: id,
      }
    });

    if (car) {
      await Car.destroy({
      where: { id: id },
    });
    }

    await car.save();

    const allCar = await Car.findAll();
    // Responde con un mensaje de éxito

    return allCar;
};

module.exports = { adminDeleteCarController };