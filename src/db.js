require('dotenv').config()
const {
    DB_USER,
    DB_HOST,
    DB_PASSWORD
} = process.env
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize("usuarios", "user", "pass", {
    host: "./lol.db",
    dialect: "sqlite",
    logging: false,
    native: false
});

module.exports = {
    ...sequelize.models,
    conexion: sequelize
}