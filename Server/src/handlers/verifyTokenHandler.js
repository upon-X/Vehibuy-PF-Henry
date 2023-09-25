const {
  updateUserStatusController,
} = require("../controllers/updateUserStatusController");
const jwt = require("jsonwebtoken");
const { getEmailController } = require("../controllers/getEmailController");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const verifyTokenHandler = async (req, res) => {
  const { token } = req.params;
  try {
    // Verifica el token
    const decoded = jwt.verify(token, "SECRET_KEY");

    // Actualiza el estado del usuario en la base de datos
    const user = await getEmailController(decoded.email);
    if (user) {
      await updateUserStatusController(decoded.email, "verificado");
      res.redirect("http://localhost:5173/login");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(500).send("Error al verificar el correo");
  }
};
module.exports = { verifyTokenHandler };
