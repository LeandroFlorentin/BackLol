require('dotenv').config()
const { conexion } = require('./src/db.js')
const servidor = require('./src/app.js')
const {
    PORT
} = process.env
const { traerGeneros, mostrarPersonajes } = require('./src/helper/personajes.js')

const puerto = PORT || 3000

conexion.sync({ force: true }).then(() => {
    servidor.listen(puerto, () => {
        traerGeneros()
        mostrarPersonajes()
        console.log("Andando en " + puerto)
    })
})
