const { Router } = require("express");
const userRouter = require("./userRouter");
const carRouter = require("./carRouter");
const mercadoPagoRouter = require("./mercadoPagoRouter");
const sellRouter = require("./sellBuyRouter");
const adminRouter = require("./adminRouter");
const buyRouter = require("./buyRouter");
const reviewRouter = require("./reviewRouter")

const routes = Router();

routes.use("/buy", buyRouter);
routes.use("/user", userRouter);
routes.use("/car", carRouter);
routes.use("/admin", adminRouter);
routes.use("/create_preference", mercadoPagoRouter)
routes.use("/sell", sellRouter);
routes.use("/review", reviewRouter)

module.exports = routes;
