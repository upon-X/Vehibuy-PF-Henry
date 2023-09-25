const { postBuyController } = require("../controllers/postBuyController");
const purchaseDetailHTML = require("../utils/purchaseDetailHTML");
const {
  getUserByIdController,
} = require("../controllers/getUserByIdController");
const mailOptions = require("../utils/mailOptions");
const transporter = require("../utils/transporter");
const { getBuyByIdController } = require("../controllers/getBuyByIdController");
const postBuyHandler = async (req, res) => {
  try {
    const { userId, carsId, description, price } = req.body;
    const carsIdArray = JSON.parse(carsId);
    const amount = carsIdArray.length;
    console.log(description);
    const descriptionArray = JSON.parse(description);
    const totalDescription = descriptionArray.join(", ");
    const finalDescription = `Total quantity: ${amount}, Purshased items: ${totalDescription}`;

    const user = await getUserByIdController(userId);
    const buyId = await postBuyController({
      userId,
      carsId,
      amount,
      finalDescription,
      price,
    });
    const buy = await getBuyByIdController(buyId);
    const id = buy.id;
    const email = user.email;
    const date = buy.createdAt;
    const subject = "Purchase completed on VehiBuy.com";
    const html = purchaseDetailHTML(price, date, id, finalDescription);
    transporter.sendMail(mailOptions(email, subject, html), (error, info) => {
      if (error) {
        console.error("Error to send notification:", error);
      } else {
        console.log(
          "Notificación por correo electrónico enviada:",
          info.response
        );
      }
    });
    return res.status(200).json({ status: "Purchase stored successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postBuyHandler,
};
