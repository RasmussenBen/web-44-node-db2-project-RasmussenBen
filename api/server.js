const express = require("express")
const server = express()
const carRouter = require('./cars/cars-router')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require('./cars/cars-middleware')

server.use(express.json())

server.get('/api/cars', carRouter.getAll)
server.get('/api/cars/:id', checkCarId, carRouter.getById)

server.post('/api/cars', [checkCarPayload, checkVinNumberValid, checkVinNumberUnique], carRouter.create)

module.exports = server
