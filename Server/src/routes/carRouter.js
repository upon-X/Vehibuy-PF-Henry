const { Router } = require("express");
const {
  getAllCarHandler,
  getDetailCarHandler,
  postCarHandler,
  createCarDbHandler,
  getFiltersHandler,
  deleteCarHandler,
  adminDeleteCarHandler,
} = require("../handlers/handlerCar");
const { putCarHandler } = require("../handlers/putCarHandler")

const carRouter = Router();
const { handlerCarUserId } = require('../handlers/handlerCarUserId')
const { getAllBrand } = require("../controllers/getAllBrand");
const { getAllColor } = require("../controllers/getAllColors");
const { getAllLocation } = require("../controllers/getAllLocation");

carRouter.get("/", getAllCarHandler);
carRouter.get('/user/:id', handlerCarUserId)
carRouter.get("/detail/:id", getDetailCarHandler);
carRouter.get("/search", getFiltersHandler);
carRouter.get("/brand", getAllBrand);
carRouter.get("/color", getAllColor);
carRouter.get("/location", getAllLocation);
carRouter.post("/create", postCarHandler);
carRouter.post("/creates", createCarDbHandler);
carRouter.delete("/delete/:id", deleteCarHandler);
carRouter.delete("/dashboard/car/:id", adminDeleteCarHandler);
carRouter.put("/edit/:id", putCarHandler);

module.exports = carRouter;
