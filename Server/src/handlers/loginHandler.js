const { getEmailController } = require("../controllers/getEmailController");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Faltan datos");
    const user = await getEmailController(email);
    const userId = user.id;
    if (!user) return res.status(404).send("Usuario no encontrado");
    if (user.ban === true) {
      return res.status(400).json({ message: "You have been banned by an Admin"});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).send("Contraseña incorrecta");
    }
    const token = jsonwebtoken.sign(
      { userId: user.id, userType: user.status },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    if (user.status == "admin")
      return res
        .status(200)
        .json({ access: true, type: "admin", id: userId, token: token });
    if (user.status == "user")
      return res
        .status(200)
        .json({ access: true, type: "user", id: userId, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  loginHandler,
};
