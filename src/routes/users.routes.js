var express = require("express");
const userCtrl = require("../controllers/users.controllers");
const auth = require("../middlewares/auth.middlewares");

const router = express.Router();

// Autenticación de Usuarios
router.post("/auth/register", userCtrl.userRegister);
router.post("/auth/login", userCtrl.userLogin);
router.get("/private", auth.isAuth, auth.userData);

module.exports = router;
