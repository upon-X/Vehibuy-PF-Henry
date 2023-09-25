const { User } = require("../db");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const transporter = require("../utils/transporter");
const verifyHTML = require("../utils/verifyHTML");
const mailOptions = require("../utils/mailOptions");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const compareOrCreateUser = require("./compareOrCreateUser");

const postUserController = async (dataUserBody) => {
  const { name, lastName, country, age, tel, email, password, status } =
    dataUserBody;

  // Hash password bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = {
    name,
    lastName,
    country,
    age,
    tel,
    status,
    email,
    password: hashedPassword,
  };

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      password: newUser.password,
      name,
      tel,
      age,
      lastName,
      status,
      country,
      status,
    },
  });
  if (created) {
    const token = jsonwebtoken.sign({ email }, SECRET_KEY, {
      expiresIn: "24h",
    });

    const subject = "Account Verification on Vehibuy.com";
    let link = `https://vehibuy-rho.vercel.app/user/verify/${token}`;
    const html = verifyHTML(link);
    transporter.sendMail(mailOptions(email, subject, html), (error, info) => {
      if (error) {
        console.error("Error to send notification:", error);
      } else {
        console.log(
          "Notificación por correo electrónico enviada:",
          info.response
        );
      }
    });
    return created;
  } else return "Account already exists";
};

module.exports = {
  postUserController,
};
