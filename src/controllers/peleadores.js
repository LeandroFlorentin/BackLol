const {
    mostrarPersonajes
} = require('../helper/personajes.js')
const { Peleadores } = require('../models/Peleadores.js')
const { Op } = require("sequelize")

const mostrarPeleadores = async (req, res) => {
    let { pag, search, Tank, Mage, Assassin, Fighter, Marksman, Support } = req.query;
    console.log(Tank)
    if (pag === "undefined") pag = 1
    if (search === "undefined") search = null
    if (Tank === "undefined") Tank = null
    if (Mage === "undefined") Mage = null
    if (Assassin === "undefined") Assassin = null
    if (Fighter === "undefined") Fighter = null
    if (Marksman === "undefined") Marksman = null
    if (Support === "undefined") Support = null
    try {
        if (
            pag === 1
            &&
            search === null
            &&
            Tank === null
            &&
            Mage === null
            &&
            Assassin === null
            &&
            Fighter === null
            &&
            Marksman === null
            &&
            Support === null
        ) {
            const peleadores = await Peleadores.findAll()
            const numeroPaginas = Math.ceil((peleadores.length) / 9)
            const numero = parseInt(pag)
            if (!pag || pag === "1" || parseInt(pag) < 1) {
                const diezPrimeros = peleadores.slice(0, 9).map(value => {
                    let obj = {}
                    for (let i in value) {
                        if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                        else obj = { ...obj, [i]: value[i] }
                    }
                })
                res.status(200).json({ results: diezPrimeros, paginas: numeroPaginas })
            }
            else {
                if (numero >= numeroPaginas) {
                    const diez = peleadores.slice(9 * (numeroPaginas - 1), 9 * numeroPaginas).map(value => {
                        let obj = {}
                        for (let i in value) {
                            if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                            else obj = { ...obj, [i]: value[i] }
                        }
                    })
                    res.status(200).json({ results: diez, paginas: numeroPaginas })
                }
                else {
                    const diez = peleadores.slice(9 * (numero - 1), 9 * numero).map(value => {
                        let obj = {}
                        for (let i in value) {
                            if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                            else obj = { ...obj, [i]: value[i] }
                        }
                    })
                    res.status(200).json({ results: diez, paginas: numeroPaginas })
                }
            }
        }
        else if (search) {
            const numero = parseInt(pag)
            const busqueda2 = [Tank, Mage, Assassin, Fighter, Marksman, Support].filter(ele => ele !== null)
            const busqueda = await Peleadores.findAll({
                where: {
                    name: { [Op.iLike]: `%${search}%` },
                    tags: { [Op.contains]: busqueda2 }
                }
            })
            const numeroPaginas = Math.ceil((busqueda.length) / 9)
            if (!pag || pag === "1" || parseInt(pag) < 1) {
                const diezPrimeros = busqueda.slice(0, 9).map(value => {
                    let obj = {}
                    for (let i in value) {
                        if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                        else obj = { ...obj, [i]: value[i] }
                    }
                })
                res.status(200).json({ results: diezPrimeros, paginas: numeroPaginas })
            }
            else {
                if (numero >= numeroPaginas) {
                    const diez = busqueda.slice(9 * (numeroPaginas - 1), 9 * numeroPaginas).map(value => {
                        let obj = {}
                        for (let i in value) {
                            if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                            else obj = { ...obj, [i]: value[i] }
                        }
                    })
                    res.status(200).json({ results: diez, paginas: numeroPaginas })
                }
                else {
                    const diez = busqueda.slice(9 * (numero - 1), 9 * numero).map(value => {
                        let obj = {}
                        for (let i in value) {
                            if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                            else obj = { ...obj, [i]: value[i] }
                        }
                    })
                    res.status(200).json({ results: diez, paginas: numeroPaginas })
                }
            }
        }
        else {
            const numero = parseInt(pag)
            const busqueda = [Tank, Mage, Assassin, Fighter, Marksman, Support].filter(ele => ele !== null)
            const filtro = await Peleadores.findAll({
                where: {
                    tags: { [Op.contains]: busqueda }
                }
            })
            const numeroPaginas = Math.ceil((filtro.length) / 9)
            if (!pag || pag === "1" || parseInt(pag) < 1) {
                const diezPrimeros = filtro.slice(0, 9).map(value => {
                    let obj = {}
                    for (let i in value) {
                        if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                        else obj = { ...obj, [i]: value[i] }
                    }
                })
                res.status(200).json({ results: diezPrimeros, paginas: numeroPaginas })
            }
            else {
                if (numero >= numeroPaginas) {
                    const diez = filtro.slice(9 * (numeroPaginas - 1), 9 * numeroPaginas).map(value => {
                        let obj = {}
                        for (let i in value) {
                            if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                            else obj = { ...obj, [i]: value[i] }
                        }
                    })
                    res.status(200).json({ results: diez, paginas: numeroPaginas })
                }
                else {
                    const diez = filtro.slice(9 * (numero - 1), 9 * numero).map(value => {
                        let obj = {}
                        for (let i in value) {
                            if ([i] === "tags") obj = { ...obj, [i]: JSON.parse(value[i]) }
                            else obj = { ...obj, [i]: value[i] }
                        }
                    })
                    res.status(200).json({ results: diez, paginas: numeroPaginas })
                }
            }
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const mostrarPersonaje = async (req, res) => {
    const { name } = req.params;
    const personajes = await Peleadores.findOne({ where: { name } })
    try {
        res.status(200).json({ ...personajes, tags: JSON.parse(personajes.tags) })
    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = {
    mostrarPeleadores,
    mostrarPersonaje
}