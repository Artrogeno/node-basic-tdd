const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const env = require('../../config/environment')

module.exports = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header) {
    return res.status(401).json({message: 'Token not provided'})
  }

  const [, token] = header.split(' ')

  try {
    const decode = await promisify(jwt.verify)(token, env.secret)
    req.userId = decode.id

    return next()
  } catch (error) {
    return res.status(401).json({message: 'Token invalid'})
  }
}