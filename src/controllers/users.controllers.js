const Models = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = Models.UsersModel;
dotenv.config();

const userRegister = async (req, res, next) => {
  try {
    //res.status(201).json(req.body);
    //add new user and return 201
    const salt = await bcrypt.genSalt(10);
    var usr = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    };
    created_user = await User.create(usr); //es el código responsable de agregar el registro de usuario en la base de datos MySQL.
    res.status(201).json(created_user);
  } catch (error) {
    res.status(404).json({ msg: "Error al cargar datos" });
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign(
        { id: user.id, email: user.email, first_name: user.first_name },
        process.env.SECRET
      );
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};

module.exports = { userRegister, userLogin };
