const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
const mercadoPago = require('mercadopago');
const requestIp = require("request-ip");

const { configureMercaPago } = require('./utils/configureMercaPago.js')


//Initializing Firebase________________________________________________
const admin = require("firebase-admin");
const serviceAccount = require("./utils/firebaseCredentials.js");

// Inicializa Firebase Admin en el inicio de tu aplicación
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

require("./db.js");

const server = express();
server.set("view engine", "ejs");
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
server.use(bodyParser.json({ limit: "100mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors(corsOptions));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

configureMercaPago(mercadoPago);


// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.use("/", routes);

module.exports = server;
