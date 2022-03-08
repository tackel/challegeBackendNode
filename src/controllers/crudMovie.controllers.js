const Models = require("../models/model");
const Movies = Models.MoviesModel;
const Personajes = Models.PersonajesModel;
const Person_movie = Models.PersonMovieModel;

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

const getMoviesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Movies.findOne({
      include: [{ model: Personajes, through: { attributes: [] } }],
      where: { id: id },
    });
    if (result === null) {
      return res.status(404).json({ message: "No hay personaje con este id" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await Movies.create({
      imagen: req.body.imagen,
      titulo: req.body.titulo,
      fecha_creacion: req.body.fecha_creacion,
      calificacion: req.body.calificacion,
    });
    try {
      const result = await Personajes.findOne({
        where: { id: req.body.personaje_id },
      });
      if (result) {
        await Person_movie.create({
          personaje_id: req.body.personaje_id,
          movie_id: movie.id,
        });
      }
    } catch (error) {
      next(error);
    }

    res.status(201).json(movie);
  } catch (error) {
    res.status(404).json({ msg: "Error al cargar datos" });
    console.log(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Movies.destroy({ where: { id: id } });
    if (result) {
      return res.status(201).json({ msg: "id " + id + " Eliminado" });
    }
    res.status(404).json({ msg: "Id no encontrado" });
  } catch (error) {
    res.status(404).json({ msg: "Error" });
    console.log(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    //const result = await Movies.findOne({ where: { id: req.body.movie_id } });
    //if (!result) {
    //return res.status(404).json({ msg: "Id de pelicula no encontrado" });
    //}
    const movie = req.body;
    const updateMov = await Movies.update(movie, {
      where: { id: id },
    });
    if (updateMov) {
      const findPersonaje = await Personajes.findOne({
        where: { id: req.body.personaje_id },
      });
      if (findPersonaje) {
        const updatePerson_movie = await Person_movie.update(
          { personaje_id: req.body.personaje_id },
          { where: { movie_id: id } }
        );

        if (updatePerson_movie == 0) {
          await Person_movie.create({
            personaje_id: req.body.personaje_id,
            movie_id: id,
          });
        }
        return res
          .status(200)
          .json({ msg: "acualizado completamente el id " + id });
      }

      if (!findPersonaje)
        await Person_movie.destroy({ where: { movie_id: id } });
      return res.status(200).json({
        msg:
          "Se actualizo el id " +
          id +
          " pero no tiene un personaje relacionado",
      });
    }

    return res.status(400).json({
      msg: "id de movie no encontrado",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMoviesAll,
  getMoviesById,
  deleteMovie,
  updateMovie,
};
