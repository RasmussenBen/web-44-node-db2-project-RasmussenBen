const { getById, getByVin } = require('./cars-model')

const checkCarId = async (req, res, next) => {
  const carId = req.params.id
  const car = await getById(carId)

  if (!car) {
    res.status(404).send({ message: `car with id ${carId} is not found` })
  }
  else {
    res.locals.car = car
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  let requiredField = undefined

  if (!vin) { requiredField = 'vin' }
  else if(!make){ requiredField = 'make' }
  else if(!model) { requiredField = 'model' }
  else if (!mileage) { requiredField = 'mileage' }

  if (requiredField) {
    res.status(400).send({ message: `${requiredField} is missing` })
  }
  else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin
  const invalidVin = vin === undefined || vin.length !== 17

  if (invalidVin) {
    res.status(400).send({ message: `vin ${vin} is invalid` })
  }
  else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin
  const carVin = await getByVin(vin)
  const existingVin = carVin.length > 0

  if (existingVin) {
    res.status(400).send({ message: `vin ${vin} already exists` })
  }
  else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}