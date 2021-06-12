const supertest = require('supertest')
const app = require('../index')
const User = require('../models/user')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
})

describe('Testing create user route', () => {
  test.skip('Create user return a 201 status and JSON Content-Type', async () => {
    const newUser = {
      email: 'jorgeagoiz@gmail.com'
    }
    await api.post('/apikey')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test.skip('If email is empty will no save register', async () => {
    const newEmptyUser = {
      email: ''
    }
    const response = await api.post('/apikey')
      .send(newEmptyUser)
      .expect(500)

    expect(response.body.message).toBe('Something went wrong.')
  })

  test.skip('If email field is not an email no save register', async () => {
    const newEmptyUser = {
      email: 'whatsupbuddy'
    }
    const response = await api.post('/apikey')
      .send(newEmptyUser)
      .expect(500)

    expect(response.body.message).toBe('Something went wrong.')
  })

  test.skip('If email is bussy will no save the same twice', async () => {
    const newBussyUser = {
      email: 'jorgeagoiz@gmail.com'
    }
    const response = await api.post('/apikey')
      .send(newBussyUser)
      .expect(401)

    expect(response.body.message).toBe('This email are registered in Quiz Questions API. Check your email inbox.')
  })
})

/* eslint-env node, jest */
