const { getCarById } = require("../controllers/getCarById");
const { carBuys } = require("../db");
const getPurchaseDetailHandler = async (req, res) => {
  const { buyId } = req.params;
  try {
    const cars = await carBuys.findAll({
      where: {
        BuyId: buyId,
      },
      attributes: ["CarId"],
    });
    const carResults = await Promise.all(
      cars.map(async (carInfo) => {
        const carId = carInfo.CarId;
        const car = await getCarById(carId);
        return car;
      })
    );
    return res.status(200).json(carResults);
  } catch (error) {
    console.error("Error al obtener los Buys por userId:", error);
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPurchaseDetailHandler,
};
