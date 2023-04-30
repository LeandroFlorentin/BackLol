require('dotenv').config()
const {
    DB_USER,
    DB_HOST,
    DB_PASSWORD
} = process.env
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize("ec2-18-228-232-214.sa-east-1.compute.amazonaws.com:3000", {
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