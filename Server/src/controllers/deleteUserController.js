const { User } = require("../db")

const deleteUserController = async (id) => {
  const userDelete = await User.destroy({
    where:
      { id }
  });
  if (userDelete) return `User with ID: ${id} deleted in the DB successfully`;
  // en caso de un error, se pasa el error al handler
  throw new Error(`Failed to delete User with ID: ${id}`);
}

module.exports = {
  deleteUserController,
}