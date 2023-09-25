const { putUserController } = require("../controllers/putUserController");
const bcrypt = require("bcrypt");

const putUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, age, country, email, password, image, tel } =
      req.body;

    // Hash password bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await putUserController(id);
    if (!user) return res.status(404).send("User not found");
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;
    if (country) user.country = country;
    if (email) user.email = email;
    if (password) user.password = hashedPassword;
    if (image) user.image = image;
    if (tel) user.tel = tel;
    await user.save();
    return res.status(200).json("user updated successfully");
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  putUserHandler,
};

module.exports = {
  putUserHandler,
};
