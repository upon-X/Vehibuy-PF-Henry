const { User } = require("../db");

const getAllUsersController = async () => {
  const users = await User.findAll();
  return users
}

module.exports = { getAllUsersController };
