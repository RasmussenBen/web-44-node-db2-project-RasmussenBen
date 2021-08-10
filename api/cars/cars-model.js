const knex = require('./../../data/db-config')

const getAll = async () => {
  const cars = await knex
    .from('cars')
    .select('id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission')
  return cars
}

const getById = async (id) => {
  const carId = await knex
    .from('cars')
    .where({ id: id })
    .select('id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission')
  return carId[0]
}

const getByVin = async (vin) => {
  const carVin = knex
    .from('cars')
    .where({ vin })
    .select('id')
  return carVin
}

const create = ({ vin, make, model, mileage, title, transmission }) => {
  const insertResult = knex('cars')
    .insert({ vin, make, model, mileage, title, transmission })
  return insertResult
}


module.exports = {
  getAll,
  getById,
  create,
  getByVin
} 