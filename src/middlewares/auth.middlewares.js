const jwt = require("jsonwebtoken");
const Models = require("../models/model");

const User = Models.UsersModel;

const isAuth = async (req, res, next) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];
    let decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Couldnt Authenticate" });
  }
};

const userData = async (req, res, next) => {
  let user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["password"] },
  });
  if (user === null) {
    res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json(user);
};

module.exports = { isAuth, userData };
