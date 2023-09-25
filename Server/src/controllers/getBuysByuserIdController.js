const { Buy } = require("../db");

const getBuysByuserIdController = async (userId) => {
  const buys = await Buy.findAll({
    where: {
      userId: userId,
    },
  });
  return buys;
};

module.exports = {
  getBuysByuserIdController,
};
