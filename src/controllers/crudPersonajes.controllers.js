const Models = require("../models/model");

const Personajes = Models.PersonajesModel;
const Movies = Models.MoviesModel;
const Person_movie = Models.PersonMovieModel;

const getPersonaje = async (req, res, next) => {
  try {
    const result = await Personajes.findAll({
      attributes: ["imagen", "nombre"],
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron personajes" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getPersonajesAll = async (rec, res, next) => {
  try {
    const result = await Personajes.findAll({
      include: [
        {
          model: Movies,
          through: { attributes: [] },
        },
      ],
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron personajes" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getPersonajeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Personajes.findOne({
      include: [{ model: Movies, through: { attributes: [] } }],
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

const createPersonaje = async (req, res, next) => {
  try {
    const pers = await Personajes.create({
      imagen: req.body.imagen,
      nombre: req.body.nombre,
      edad: req.body.edad,
      peso: req.body.peso,
      historia: req.body.historia,
    });
    try {
      const result = await Movies.findOne({ where: { id: req.body.movie_id } });
      if (result) {
        await Person_movie.create({
          personaje_id: pers.id,
          movie_id: req.body.movie_id,
        });
      }
    } catch (error) {
      next(error);
    }

    res.status(201).json(pers);
  } catch (error) {
    res.status(404).json({ msg: "Error al cargar datos" });
    console.log(error);
  }
};

const deletePersonaje = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Personajes.destroy({ where: { id: id } });
    if (result) {
      return res.status(201).json({ msg: "id " + id + " Eliminado" });
    }
    res.status(404).json({ msg: "Id no encontrado" });
  } catch (error) {
    res.status(404).json({ msg: "Error" });
    console.log(error);
  }
};

const updatePersonaje = async (req, res, next) => {
  try {
    const { id } = req.params;
    //const result = await Movies.findOne({ where: { id: req.body.movie_id } });
    //if (!result) {
    //return res.status(404).json({ msg: "Id de pelicula no encontrado" });
    //}
    const personaje = req.body;
    const updatePerson = await Personajes.update(personaje, {
      where: { id: id },
    });
    if (updatePerson) {
      const findMovie = await Movies.findOne({
        where: { id: req.body.movie_id },
      });
      if (findMovie) {
        const updatePerson_movie = await Person_movie.update(
          { movie_id: req.body.movie_id },
          { where: { personaje_id: id } }
        );

        if (updatePerson_movie == 0) {
          await Person_movie.create({
            personaje_id: id,
            movie_id: req.body.movie_id,
          });
        }
        return res
          .status(200)
          .json({ msg: "acualizado completamente el id " + id });
      }

      if (!findMovie)
        await Person_movie.destroy({ where: { personaje_id: id } });
      return res.status(200).json({
        msg:
          "Se actualizo el id " +
          id +
          " pero no tiene una pelicula relacionada valida",
      });
    }

    return res.status(400).json({
      msg: "id de personaje no encontrado",
    });
  } catch (error) {
    next(error);
  }
};

// filtros de personajes
// por nombre

const filtrosPersonajes = async (req, res, next) => {
  try {
    const filtros = req.query;

    if (filtros.name) {
      if (filtros.name && filtros.age && filtros.movies) {
        const filtroAgeMovies = await Personajes.findAll({
          include: [
            {
              model: Movies,
              through: { attributes: [] },
              where: {
                id: filtros.movies,
              },
            },
          ],
          where: {
            nombre: filtros.name,
            edad: filtros.age,
          },
        });
        return res.status(200).json(filtroAgeMovies);
      }

      if (filtros.name && filtros.age) {
        const filtroNameAge = await Personajes.findAll({
          where: {
            nombre: filtros.name,
            edad: filtros.age,
          },
        });
        return res.status(200).json(filtroNameAge);
      }
      const result = await Personajes.findAll({
        where: { nombre: filtros.name },
      });
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ msg: "No ingreso un nombre" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPersonaje,
  getPersonajesAll,
  getPersonajeById,
  createPersonaje,
  deletePersonaje,
  updatePersonaje,
  filtrosPersonajes,
};
