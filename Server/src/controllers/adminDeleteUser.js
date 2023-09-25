const { User } = require("../db");

const adminDeleteUser = async (req, res) => {
  const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la ruta

  try {
    // Busca el usuario por ID
    const user = await User.findOne({
      where: {
        id: id,
      }
    });

    if (!user) {
      // Si no se encontró el usuario, responde con un mensaje de error
      return res.status(404).json({ message: `El usuario con ID ${id} no existe.` });
    }

    if (user.status === "admin") {
      // Si el usuario tiene el tipo "admin", no permitas la eliminación
      return res.status(403).json({ message: `No puedes eliminar a un usuario de tipo "admin"` });
    }

    // Si no es un usuario "admin", procede con la eliminación
    await User.destroy({
      where: { id: id },
    });

    await user.save();

    const allUsers = await User.findAll();
    // Responde con un mensaje de éxito
    res.status(200).json(allUsers);
  } catch (error) {
    // Si hay un error en la operación, responde con un mensaje de error
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor al eliminar el usuario." });
  }
};

module.exports = { adminDeleteUser };
