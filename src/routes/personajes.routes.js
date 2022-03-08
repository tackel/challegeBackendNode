var express = require("express");
const personajesCtrl = require("../controllers/crudPersonajes.controllers");
const auth = require("../middlewares/auth.middlewares");

const router = express.Router();

// Listado de Personajes solo imagen y nombre
router.get("/characters", auth.isAuth, personajesCtrl.getPersonaje);

// Creación, Edición y Eliminación de Personajes (CRUD)
router.get("/charactersAll", auth.isAuth, personajesCtrl.getPersonajesAll);
router.post("/characters", auth.isAuth, personajesCtrl.createPersonaje);
router.delete("/characters/:id", auth.isAuth, personajesCtrl.deletePersonaje);
router.put("/characters/:id", auth.isAuth, personajesCtrl.updatePersonaje);
// Detalle de Personaje
router.get("/characters/:id", auth.isAuth, personajesCtrl.getPersonajeById);

// Detalle de Personaje
//router.get("/characters/:id", auth.isAuth, personajesCtrl.getPersonaje);

// Búsqueda de Personajes
// localhost:4000/?name=nombre&age=edad&movies=idMovie
router.get("/", auth.isAuth, personajesCtrl.filtrosPersonajes);

module.exports = router;
