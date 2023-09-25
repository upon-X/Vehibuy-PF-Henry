const { User } = require("../db");

exports.getUsersInDashboard = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios de la BD" });
  }
};
