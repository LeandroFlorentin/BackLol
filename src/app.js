const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')

const servidor = express()

const list = ["https://front-lol.vercel.app/"]

servidor.use(morgan('dev'))
servidor.use(cors({
  origin: list
}))
servidor.use('/', routes)

module.exports = servidor