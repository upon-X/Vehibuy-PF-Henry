const { putCarController } = require("../controllers/putCarController");

const putCarHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, image, brand, model, state, price, location, color, description } = req.body;
    // An object is created with the modifications that arrive by body and, if there are modifications, they are added
    const modifications = {id};
    if (name) modifications.name = name;
    if (image) modifications.image = image;
    if (brand) modifications.brand = brand;
    if (model) modifications.model = model;
    if (state) modifications.state = state;
    if (price) modifications.price = price;
    if (location) modifications.location = location;
    if (color) modifications.color = color;
    if (description) modifications.description = description;
    // When all the modifications are ready, they are sent to the controller.
    console.log(modifications,"soy el edit en back");
    const carModified = await putCarController(modifications);
    return res.status(200).json(carModified);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  putCarHandler,
}