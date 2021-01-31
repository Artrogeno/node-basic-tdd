const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const env = require('../../config/environment')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING 
    },
    email: {
      type: DataTypes.STRING 
    },
    password_hash: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.VIRTUAL
    }
  }, {
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8)
        }
      }
    }
  })

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.prototype.generateToken = function() {
    return jwt.sign({
      id: this.id,
      email: this.email,
      name: this.name
    }, env.secret )
  }

  return User
}
