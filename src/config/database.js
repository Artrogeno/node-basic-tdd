const env = require('./environment')

module.exports = {
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  dialect: env.db.dialect,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}
