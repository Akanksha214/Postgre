import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import { logger } from './config/logger'

// const https = require('https')
const cors = require('cors')
const app = express()
const port = config.aios.port
const SocketIdArr = []

app.use(cors())
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./route')
app.use('/api', routes)

const server = require('http').createServer(app)

server.listen(port, (err) => {
  if (err) {
    logger.error('Error occured while starting server: ', err)
    return
  }
 
  logger.debug('Server started in port no: ', port)
})
