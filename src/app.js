const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')

const servidor = express()

servidor.use(morgan('dev'))
servidor.use(cors({
  origin: "https://front-lol.vercel.app/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}))
servidor.use('/', routes)

module.exports = servidor