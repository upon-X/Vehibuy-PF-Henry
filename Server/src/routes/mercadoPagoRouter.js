const express = require("express");
const mercadopagoRouter = express.Router();
const mercadoPago = require("../controllers/mercadoPago");

mercadopagoRouter.post("/", mercadoPago.createPreference);

module.exports = mercadopagoRouter;