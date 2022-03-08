var express = require("express");

const movieCtrl = require("../controllers/crudMovie.controllers");
const auth = require("../middlewares/auth.middlewares");

const router = express.Router();

router.get("/movies", auth.isAuth, movieCtrl.getMovies);
router.post("/movie", auth.isAuth, movieCtrl.createMovie);
// todos los campos + personajes
router.get("/moviesAll", auth.isAuth, movieCtrl.getMoviesAll);

module.exports = router;
