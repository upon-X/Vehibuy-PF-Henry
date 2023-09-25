const { Router } = require("express");
//handlers importados
const { postUserHandler } = require("../handlers/postUserHandler");
const { deleteUserHandler } = require("../handlers/deleteUserHandler");
const { loginHandler } = require("../handlers/loginHandler");
const { getUsersHandler } = require("../handlers/getUsersHandler");
const { putUserHandler } = require("../handlers/putUserHandler");
const { googleLoginHandler } = require("../handlers/googleLoginHandler");
const { verifyTokenHandler } = require("../handlers/verifyTokenHandler");
const { checkUserRole } = require("../handlers/CheckUserRole");
const { getUsersInDashboard } = require("../controllers/getUsersInDashboard");
const { getUserbyEmailHandler } = require("../handlers/getUserbyEmailHandler");
const { getUserbyIdHandler } = require("../handlers/getUserbyIdHandler");
const { adminDeleteUser } = require("../controllers/adminDeleteUser");
const { adminInputUser } = require("../controllers/adminPutUser");
const { getFiltersHandler } = require("../handlers/handlerUserFilter");
const router = Router();

//configuracion de rutas
router.get("/verify/:token", verifyTokenHandler);
router.post("/google", googleLoginHandler);
router.post("/create", postUserHandler);
router.delete("/delete/:id", deleteUserHandler);
router.get("/", getUsersHandler);
router.get("/:id", getUserbyIdHandler);
router.post("/", loginHandler);
router.put("/:id", putUserHandler);

//Configuracion de rutas de admi
router.get("/dashboard/users", getUsersInDashboard);
router.delete("/dashboard/users/:id", adminDeleteUser);
router.put("/dashboard/users/:id", adminInputUser);
router.get("/dashboard/filter", getFiltersHandler);

module.exports = router;
