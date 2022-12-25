require('dotenv').config()
const {
    DB_USER,
    DB_HOST,
    DB_PASSWORD
} = process.env
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize("postgres://db_videogames_user:nCpRwTXMd2G8Fkd8mVpLGtMLa6WGpyG9@dpg-ce8cge02i3mlmrfb55hg-a.oregon-postgres.render.com/db_videogames", {
    logging: false,
    native: false,
    dialectOptions: {
        ssl: {
            require: true,
        }
    }
});

module.exports = {
    ...sequelize.models,
    conexion: sequelize
}