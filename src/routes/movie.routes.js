var express = require("express");

const movieCtrl = require("../controllers/crudMovie.controllers");
const auth = require("../middlewares/auth.middlewares");

const router = express.Router();

router.get("/movies", auth.isAuth, movieCtrl.getMovies);
router.get("/movies/:id", auth.isAuth, movieCtrl.getMoviesById);
router.post("/movie", auth.isAuth, movieCtrl.createMovie);
// todos los campos + personajes
router.get("/moviesAll", auth.isAuth, movieCtrl.getMoviesAll);
router.put("/movies/:id", auth.isAuth, movieCtrl.updateMovie);
router.delete("/movies/:id", auth.isAuth, movieCtrl.deleteMovie);

module.exports = router;
