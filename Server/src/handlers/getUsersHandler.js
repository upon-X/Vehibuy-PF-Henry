const {
  getAllUsersController,
} = require("../controllers/getAllUsersController");

const getUsersHandler = async (req, res) => {
  try {
    const responseDb = await getAllUsersController();
    return res.status(200).json(responseDb);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { getUsersHandler };
