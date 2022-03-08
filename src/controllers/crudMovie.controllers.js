const Models = require("../models/model");
const Movies = Models.MoviesModel;
const Personajes = Models.PersonajesModel;

const getMovies = async (req, res, next) => {
  try {
    const result = await Movies.findAll({
      attributes: ["imagen", "titulo", "fecha_creacion"],
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron personajes" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: "error" });
    console.log(error);
  }
};

const getMoviesAll = async (req, res, next) => {
  try {
    const result = await Movies.findAll({
      include: [
        {
          model: Personajes,
          through: { attributes: [] },
        },
      ],
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron personajes" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const createMovie = async (req, res, next) => {
  try {
    const createdMovie = await Movies.create({
      imagen: req.body.imagen,
      titulo: req.body.titulo,
      fecha_creacion: req.body.fecha_creacion,
      calificacion: req.body.calificacion,
    });

    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(404).json({ msg: "Error al cargar datos" });
    console.log(error);
  }
};

module.exports = { createMovie, getMovies, getMoviesAll };
