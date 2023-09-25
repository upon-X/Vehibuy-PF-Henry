const { Car } = require("../db")

const deleteCarController = async (id) => {
  const carDelete = await Car.destroy({
    where:
      { id }
  });
  if (carDelete) return `User with ID: ${id} deleted in the DB successfully`;
  // en caso de un error, se pasa el error al handler
  throw new Error(`Failed to delete car with ID: ${id}`);
}

module.exports = {
  deleteCarController,
}
