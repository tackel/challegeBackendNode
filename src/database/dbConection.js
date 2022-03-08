const { Sequelize } = require("sequelize");
const { db } = require("./dbConfig");

/*
const sequelize = new Sequelize(
  `postgres://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`
);
*/
const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: "mysql",
});
const prueba = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
prueba();

module.exports = { sequelize };
