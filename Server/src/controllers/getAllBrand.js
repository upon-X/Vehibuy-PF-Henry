const axios = require("axios");
const { Brand } = require("../db");

const getAllBrand = async (req, res) => {
  try {
    const data = await Brand.findAll()
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ocurrió un error al obtener y procesar los datos." });
  }
};

module.exports = { getAllBrand };
