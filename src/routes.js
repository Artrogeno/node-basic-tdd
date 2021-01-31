const routes = require('express').Router()

const auth = require('./app/controllers/AuthController')
const authMiddleware = require('./app/middlewares/auth')

routes.post('/auth', auth.signin)

routes.use(authMiddleware)

routes.get('/profile',(req, res) => {
  res.status(200).send()
})

module.exports = routes