
const express = require('express')

const userRoute = require('./user/route')
const productRoute = require('./product/route')
const orderRoute = require('./order/route')
const mainRouter = express.Router()


mainRouter.use('/users', userRoute)
mainRouter.use('/product', productRoute)
mainRouter.use('/order', orderRoute)

module.exports = mainRouter