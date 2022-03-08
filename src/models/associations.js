const { sequelize } = require("../database/dbConection");

const { PersonajesModel } = require("./model");
const { MoviesModel } = require("./model");
const { GeneroModel } = require("./model");
const { PersonMovieModel } = require("./model");
// genero va a tener muchas movies
// se crea
GeneroModel.hasMany(MoviesModel, { as: "generos", foreignKey: "generoId" });
MoviesModel.belongsTo(GeneroModel, { as: "genero" });

// Personaje pertenece a varias peliculas
PersonajesModel.belongsToMany(MoviesModel, {
  through: PersonMovieModel,
  foreignKey: "personaje_id",
});
MoviesModel.belongsToMany(PersonajesModel, {
  through: PersonMovieModel,
  foreignKey: "movie_id",
});
/*
(async () => {
  await sequelize.sync();
})();
*/
/*
module.exports = {
  PersonajesModel,
  MoviesModel,
  GeneroModel,
};
*/
exports.PersonajesModel = PersonajesModel;
exports.GeneroModel = GeneroModel;
exports.MoviesModel = MoviesModel;
