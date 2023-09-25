const { User } = require("../db");

const putBanUserController = async (modifications) => {
  try {

    const userToUpdate = await User.findByPk(modifications.id);
    if (!userToUpdate) throw new Error("User not found");

     // The user is updated with the modifications provided
    const [updatedCount] = await User.update(modifications, {
      where: { id: modifications.id },
    });
    // If there are modifications, it looks for the updated user and returns it
    if (updatedCount) {
      const userToUpdate = await User.findByPk(userToUpdate.id);
      return userToUpdate;
    }
    // If no modification is made, we throw an error
    throw new Error("No modifications were made"); 
  } catch (error) {
    throw new Error("Failed to update user");
  }
}

module.exports = {
  putBanUserController,
}