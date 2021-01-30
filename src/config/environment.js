const dotenv = require('dotenv')

dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 'development',
  db: {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME ||  'postgres',
    username: process.env.DB_USERNAME ||  'artrogeno',
    password: process.env.DB_PASSWORD ||  'artrogeno',
    dialect: process.env.DB_DRIVE ||  'postgres',
  }
}

module.exports = config
