import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor() {
    super('/api/cars')
    this.router
      .get('', this.getCars)
      .get('/:carId', this.getCar)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addCar)
      .put('/:id', this.editCar)
      .delete('/:id', this.removeCar)
  }
  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars()
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }
  async getCar(req, res, next) {
    try {
      const car = await carsService.getCar(req.params.carId)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
  async addCar(req, res, next) {
    try {
      const formData = req.body
      formData.sellerId = req.userInfo.id
      const car = await carsService.addCar(formData)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
  async editCar(req, res, next) {
    try {
      req.body.id = req.params.id
      const car = await carsService.editCar(req.body, req.userInfo)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
  async removeCar(req, res, next) {
    try {
      await carsService.removeCar(req.params.id, req.userInfo)
      res.send('Deleted Car!')
    } catch (error) {
      next(error)
    }
  }
}