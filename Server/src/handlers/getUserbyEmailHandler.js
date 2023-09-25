const { getUserbyEmailController } = require("../controllers/getUserbyEmailController");

const getUserbyEmailHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const userByEmail = await getUserbyEmailController(email);
    return res.status(200).json(userByEmail);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {
  getUserbyEmailHandler
}