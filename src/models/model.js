const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConection");
//const association = require("./associations");

const PersonajesModel = sequelize.define("personajes", {
  //id: { type: DataTypes.INTEGER, primaryKey: true },
  imagen: { type: DataTypes.STRING },
  nombre: { type: DataTypes.STRING },
  edad: { type: DataTypes.INTEGER },
  peso: { type: DataTypes.INTEGER },
  historia: { type: DataTypes.TEXT },
});

const MoviesModel = sequelize.define("movies", {
  //id: { type: DataTypes.INTEGER, primaryKey: true },
  imagen: { type: DataTypes.STRING },
  titulo: { type: DataTypes.STRING },
  fecha_creacion: { type: DataTypes.DATE },
  calificacion: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: {
        args: true,
        msg: "Calificar del 1 al 5",
      },
      min: {
        args: 1,
        msg: "La calificacion tiene que ser mayor o igual que uno",
      },
      max: {
        args: 5,
        msg: "La calificacion tiene que ser menor o igual a 5",
      },
    },
  },
});

const GeneroModel = sequelize.define("generos", {
  //id: { type: DataTypes.INTEGER, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  imagen: { type: DataTypes.STRING },
});

const PersonMovieModel = sequelize.define("person_movie", {
  personaje_id: {
    type: DataTypes.INTEGER,
    references: {
      model: PersonajesModel,
      key: "id",
    },
  },
  movie_id: {
    type: DataTypes.INTEGER,
    null: true,
    references: {
      model: MoviesModel,
      key: "id",
    },
  },
});

const UsersModel = sequelize.define("users", {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});
/*
(async () => {
  await sequelize.sync();
})();
*/
module.exports = {
  PersonajesModel,
  MoviesModel,
  GeneroModel,
  UsersModel,
  PersonMovieModel,
};
