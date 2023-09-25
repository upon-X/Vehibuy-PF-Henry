const { User } = require("../db");

const getEmailController = async (email) => {
  return await User.findOne({ where: { email } });
};
module.exports = { getEmailController};
