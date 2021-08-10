const { getAll, create } = require('./cars-model.js')

const carRouter = {
    async getAll (req, res) {
        const allCars = await getAll()

        res.send(allCars)
    },
    getById (req, res) {
        res.send(res.locals.car)
    },
    async create (req, res) {
        const { vin, make, model, mileage, title, transmission } = req.body

        const createCarResponse = await create({ vin, make, model, mileage, title, transmission })
        const createdCarId = createCarResponse.pop()
        const createdCar = { id: createdCarId, vin, make, model, mileage, title, transmission }

        res.send(createdCar)
    }
}

module.exports = carRouter