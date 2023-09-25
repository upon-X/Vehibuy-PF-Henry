const { Car } = require("../db");

const putCarController = async (modifications) => {
  try {
    const carToUpdate =   Car.findByPk(modifications.id);
    if (!carToUpdate) throw new Error("Car not found");

    const [updatedCount] = await Car.update(modifications, {
      where: { id: modifications.id },
    });
    // If there are modifications, it looks for the updated car and returns it
    if (updatedCount) {
      const updatedCar = await Car.findByPk(modifications.id);
      return updatedCar;
    }
      // If no modification is made, we throw an error
      throw new Error("No modifications were made");
    
  } catch (error) {
    // If there is an error in the process, it is received by the catch
    throw new Error("Failed to update car");
  }
}

module.exports = {
  putCarController,
}