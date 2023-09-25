const { Buy } = require("../db");

const getBuyByIdController = async (id) => {
  const buy = await Buy.findByPk(id);
  if (!buy) {
    return "Buy not found";
  }
  return buy;
};

module.exports = { getBuyByIdController };
