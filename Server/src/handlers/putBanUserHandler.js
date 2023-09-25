const { putBanUserController } = require("../controllers/putBanUserController");

const putBanUserHandler = async (req, res) => {
  try {
    const { id, ban, lastName, age, country, email, password, status, image, tel } = req.body;
    const modifications = {
      id
    };
    
    if(ban) modifications.ban = ban;
    if(lastName) modifications.lastName= lastName;
    if(age )modifications.age = age;
    if(country) modifications.country = country;
    if(email) modifications.email = email;
    if(password) modifications.password = password;
    if(status) modifications.status = status;
    if(image) modifications.image = image;
    if(tel) modifications.tel = tel;
    
    // When all the modifications are ready, they are sent to the controller.
    const userModified = await putBanUserController(modifications);
    return res.status(200).json(userModified);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {
  putBanUserHandler,
}