const {
  getBuysByuserIdController,
} = require("../controllers/getBuysByuserIdController");
const { Buy } = require("../db");
const getBuysByuserIdHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const buys = await getBuysByuserIdController(userId);
    return res.status(200).json(buys);
  } catch (error) {
    console.error("Error al obtener los Buys por userId:", error);
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBuysByuserIdHandler,
};
