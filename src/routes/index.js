const { Router } = require("express");
const sequelize = require("../database/dbConection");
const router = Router();
const models = require("../models/model");
/*
router.get("/", (req, res) => {
  res.end("Hola mundo");
});
*/

module.exports = router;
