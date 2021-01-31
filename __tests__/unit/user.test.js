const bcrypt = require('bcryptjs')

const truncate = require('../utils/truncate')
const { User } = require('../../src/app/models')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt password', async() => {
    const user = await User.create({
      name: 'Arthur',
      email: 'root.arthur@gmail.com',
      password: '123456'
    })

    const compareHash = await bcrypt.compare('123456', user.password_hash)
    expect(compareHash).toBe(true)
  })
})