const axios = require("axios");

const getAllLocation = async (req, res) => {
  try {
    const { data } = await axios.get("http://localhost:7183/car");

    const carLocation = data.map((car) => car.location);

    // Eliminar marcas duplicadas utilizando un conjunto (Set)
    const uniqueCarsLocation = [...new Set(carLocation)];

    // Filtrar los valores en blanco o "???"
    // const filteredColors = uniqueCarsLocation.filter((location) => color && color !== "??");

    return res.status(200).json(uniqueCarsLocation);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ocurrió un error al obtener y procesar los datos." });
  }
};

module.exports = { getAllLocation };
