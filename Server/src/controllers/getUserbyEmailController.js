const { User } = require("../db");

const getUserbyEmailController = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");
  return user;
}

module.exports = {
  getUserbyEmailController
}