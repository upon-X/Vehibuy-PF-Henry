const { User } = require("../db");

const putUserController = async (id) => {
  return await User.findByPk(id);
};

module.exports = { putUserController };
