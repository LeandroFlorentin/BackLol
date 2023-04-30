const axios = require('axios')
const { Generos } = require('../models/Generos.js')
const { Peleadores } = require('../models/Peleadores.js')

const mostrarPersonajes = async () => {
    let personajes = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.23.1/data/es_MX/champion.json')
    let arrayPersonajes = Object.keys(personajes.data.data).map(function (key) { return personajes.data.data[key] })
    let arrayConImagen = arrayPersonajes.map(ele => ({ ...ele, imagen: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ele.id}_0.jpg` }))
    let newArray = arrayConImagen.map(value => {
        let obje = {}
        for (let i in value) {
            if (typeof value[i] === "object") obje = { ...obje, [i]: (JSON.stringify(value[i])) }
            else obje = { ...obje, [i]: value[i] }
        }
        return obje
    })
    Peleadores.bulkCreate(newArray)
}

const traerGeneros = async () => {
    let personajes = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.23.1/data/es_MX/champion.json')
    let arrayPersonajes = Object.keys(personajes.data.data).map(function (key) { return personajes.data.data[key] })
    let tags = [...new Set(arrayPersonajes.map(ele => ele.tags).flat())].map(persona => ({ genero: persona }))
    Generos.bulkCreate(tags)
}

module.exports = {
    mostrarPersonajes,
    traerGeneros
}