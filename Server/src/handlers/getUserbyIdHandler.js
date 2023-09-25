const { getUserByIdController } = require("../controllers/getUserByIdController");

const getUserbyIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdController(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUserbyIdHandler,
}