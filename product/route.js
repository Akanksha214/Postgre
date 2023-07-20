import { ProductService } from './service'
import express from 'express'
import { validateToken } from '../utils/authentication-helper'
import { validatePermission } from '../validation/permission-validator'

const productRouter = express.Router()
const productService = new ProductService()

productRouter
  .post('/add', productService.addProduct.bind(productService))
  .post('/update', productService.updateProduct.bind(productService))
  
 
module.exports = productRouter
