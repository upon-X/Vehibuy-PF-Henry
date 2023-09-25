const { Router } = require("express");
//handlers importados
const { getUsersHandler } = require("../handlers/getUsersHandler");
const { getUserbyEmailHandler } = require("../handlers/getUserbyEmailHandler")
const { deleteUserHandler } = require("../handlers/deleteUserHandler");
const { postUserHandler } = require("../handlers/postUserHandler");
const { putBanUserHandler } = require("../handlers/putBanUserHandler");
const adminRouter = Router();

//configuracion de rutas
adminRouter.get("/users", getUsersHandler);
adminRouter.get("/:email", getUserbyEmailHandler);
adminRouter.post("/user", postUserHandler);
adminRouter.put("/user", putBanUserHandler);
adminRouter.delete("/delete", deleteUserHandler);

module.exports = adminRouter;
