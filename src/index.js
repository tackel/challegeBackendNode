const express = require("express");
const morgan = require("morgan");
const association = require("./models/associations");
var indexRoute = require("./routes/index");
var personajesRouter = require("./routes/personajes.routes");
var usersRouter = require("./routes/users.routes");
var movieRouter = require("./routes/movie.routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/", indexRoute);
app.use("/users", usersRouter);
app.use("/", personajesRouter);
app.use("/", movieRouter);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});
const PORT = 4000;
app.listen(PORT);
console.log(`Server on port ${PORT}`);
