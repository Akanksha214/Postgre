import { OrderService } from './service'
import express from 'express'
import { validateToken } from '../utils/authentication-helper'
import { validatePermission } from '../validation/permission-validator'

const orderRouter = express.Router()
const orderService = new  OrderService()

orderRouter
  .post('/add', orderService.addOrder.bind(orderService))
  .post('/update', orderService.updateOrder.bind(orderService))
  .post('/get', orderService.getOrder.bind(orderService))

  
 
module.exports = orderRouter
