import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CarsService {
  async removeCar(carId, userInfo) {

    const car = await this.getCar(carId)
    if (userInfo.id != car.sellerId.toString()) {
      throw new Forbidden('Go away...thats not your car')
    }
    if (!car) {
      throw new BadRequest('Invalid car id')
    }
    car.delete()
  }
  async getCar(carId) {
    const car = await dbContext.Cars.findById(carId).populate('seller', 'name picture')
    if (!car) {
      throw new BadRequest('Invalid car id')
    }
    return car
  }
  async editCar(carData, userInfo) {
    const car = await this.getCar(carData.id)
    if (userInfo.id != car.sellerId.toString()) {
      throw new Forbidden('Go away...thats not your car')
    }
    car.make = carData.make || car.make
    car.model = carData.model || car.model
    car.price = carData.price || car.price
    car.year = carData.year || car.year
    car.description = carData.description || car.description
    car.imgUrl = carData.imgUrl || car.imgUrl
    await car.save()
    return car
  }
  async addCar(formData) {
    const car = await dbContext.Cars.create(formData)
    return car
  }
  async getCars() {
    const cars = await dbContext.Cars.find()
    return cars
  }

}
export const carsService = new CarsService()