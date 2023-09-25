const axios = require("axios");

const getAllColor = async (req, res) => {
  try {
    const { data } = await axios.get("http://localhost:7183/car");

    const carColor = data.map((car) => car.color);

    // Eliminar marcas duplicadas utilizando un conjunto (Set)
    const uniqueCarsColor = [...new Set(carColor)];

    // Filtrar los valores en blanco o "???"
    const filteredColors = uniqueCarsColor.filter(
      (color) => color && color !== "??"
    );

    return res.status(200).json(filteredColors);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ocurrió un error al obtener y procesar los datos." });
  }
};

module.exports = { getAllColor };
