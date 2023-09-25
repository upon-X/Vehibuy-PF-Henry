const { postUserController } = require("../controllers/postUserController");

const postUserHandler = async (req, res) => {
  try {
    const dataUserBody = req.body;
    const result = await postUserController(dataUserBody);
    if (result === "Account already exists")
      return res
        .status(409)
        .json({ message: "Account already exists", data: result });
    return res
      .status(201)
      .json({ message: "User successfully created", data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postUserHandler,
};
