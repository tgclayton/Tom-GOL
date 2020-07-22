const path = require('path')
const express = require('express')
const saves = require('./routes/saves')
const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/saves', saves)

module.exports = server
