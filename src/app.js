const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')

class AppController {
  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(bodyParse.urlencoded({ extended: true }))
    this.express.use(bodyParse.json({ limit: '2mb' }))
    this.express.use(cors())
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new AppController().express
