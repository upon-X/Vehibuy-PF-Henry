const { deleteUserController } = require("../controllers/deleteUserController");

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await deleteUserController(id);
    res.status(200).json(deleteResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteUserHandler,
}