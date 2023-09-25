const { Buy } = require("../db");
const { carBuys } = require("../db");

const postBuyController = async ({
  userId,
  carsId,
  amount,
  finalDescription,
  price,
}) => {
  newBuy = await Buy.create({
    amount,
    description: finalDescription,
    price,
    userId,
  });
  const BuyId = newBuy.id;
  const carsIdArray = JSON.parse(carsId);
  const carsIdMap = carsIdArray.map((carId) => {
    return { CarId: carId, BuyId };
  });
  await carBuys.bulkCreate(carsIdMap);
  return BuyId;
};

module.exports = {
  postBuyController,
};
