const { Router } = require("express");
const { postBuyHandler } = require("../handlers/postBuyHandler");
const {
  getBuysByuserIdHandler,
} = require("../handlers/getBuysByuserIdHandler");
const {
  getPurchaseDetailHandler,
} = require("../handlers/getPurchaseDetailHandler");

const router = Router();

router.post("/create", postBuyHandler);
router.get("/getByuser/:userId", getBuysByuserIdHandler);
router.get("/detail/:buyId", getPurchaseDetailHandler);
module.exports = router;
