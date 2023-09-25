const { compareOrCreateUser } = require("../controllers/compareOrCreateUser");
const { getIpUserController } = require("../controllers/getIpUserController");
const admin = require("firebase-admin");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const googleLoginHandler = async (req, res) => {
  let ipinfoResponse = {};
  try {
    const tokenFirebase = req.body.tokenFirebase;
    const decodedToken = await admin.auth().verifyIdToken(tokenFirebase);
    const clientIp = req.clientIp;
    try {
      ipinfoResponse = await getIpUserController(clientIp);
    } catch (error) {
      ipinfoResponse = { data: "undefined" };
    }
    let { country } = ipinfoResponse.data;
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name;
    const image = decodedToken.picture;
    const tel = decodedToken.phone_number;
    const age = 18;
    const lastName = decodedToken.name;
    const status = "user";
    if (country == undefined) {
      country = "undefined";
    }
    const user = await compareOrCreateUser({
      email,
      uid,
      name,
      image,
      tel,
      age,
      lastName,
      status,
      country,
    });
    const userId = user[0].dataValues.id;
    if (user[0].dataValues.password != uid) {
      return res.status(409).send({
        access: false,
        message: "Error: Account already previously registered.",
      });
    }
    const token = jsonwebtoken.sign(
      { userId: user[0].dataValues.id, userType: user[0].dataValues.status },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log(token);
    return res.status(200).json({
      access: true,
      type: "user",
      id: userId,
      name: name,
      email: email,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al verificar el token" });
  }
};
module.exports = { googleLoginHandler };
