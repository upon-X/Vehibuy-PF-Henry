const { User } = require("../db");

const updateUserStatusController = async (email) => {
  try {
    // Buscar al usuario por su ID en la base de datos
    const user = await User.findOne({ where: { email: email } });

    // Verificar si el usuario existe
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Actualizar el estado del usuario
    user.verify = true;

    // Guardar los cambios en la base de datos
    await user.save();

    // Devolver el usuario actualizado
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = { updateUserStatusController };
