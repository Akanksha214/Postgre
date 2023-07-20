import { UserService } from './service'
import express from 'express'
import { validateToken } from '../utils/authentication-helper'
import { validatePermission } from '../validation/permission-validator'

const userRouter = express.Router()
const userService = new UserService()

userRouter
  .post('/add', userService.addUser.bind(userService))
  .post('/update',userService.updateUser.bind(userService))
  .post('/get',userService.getUser.bind(userService))
 
module.exports = userRouter
