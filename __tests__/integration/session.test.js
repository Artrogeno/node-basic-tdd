const request = require('supertest')

const truncate = require('../utils/truncate')
const app = require('../../src/app')
const { User } = require('../../src/app/models')


describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Arthur',
      email: 'root.arthur@gmail.com',
      password: '123456'
    })

    const response = await request(app)
      .post('/auth')
      .send({
        email: user.email,
        password: '123456'
      })
    expect(response.status).toBe(200)
  })
  
  it('should not authenticate with invalid credentials', async () => {
    const user = await User.create({
      name: 'Arthur',
      email: 'root.arthur@gmail.com',
      password: '123456'
    })

    const response = await request(app)
      .post('/auth')
      .send({
        email: user.email,
        password: '654321'
      })
    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async() => {
    const user = await User.create({
      name: 'Arthur',
      email: 'root.arthur@gmail.com',
      password: '123456'
    })

    const response = await request(app)
      .post('/auth')
      .send({
        email: user.email,
        password: '123456'
      })
    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () =>{
    const user = await User.create({
      name: 'Arthur',
      email: 'root.arthur@gmail.com',
      password: '123456'
    })

    const response = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${user.generateToken()}`)
    
    expect(response.status).toBe(200)  
  })

  it('should not be able to access private routes without jwt', async () =>{
    const response = await request(app)
      .get('/profile')
    
    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with invalid jwt', async () =>{
    const response = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer abcde123`)
    
    expect(response.status).toBe(401)
  })
})

