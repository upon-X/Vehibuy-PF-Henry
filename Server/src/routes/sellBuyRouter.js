const { Router } = require("express");
const { createSellHandler } = require("../handlers/postSell");

const sellRouter = Router();


sellRouter.post("/create", createSellHandler);



module.exports = sellRouter;