const uuidAPIKey = require('uuid-apikey')
const supertest = require('supertest')
const app = require('../index')
const User = require('../models/user')

const api = supertest(app)

beforeAll(async () => {
  const newUser = {
    email: 'jorgeagoiz@gmail.com'
  }
  await api.post('/apikey')
    .send(newUser)
})

describe('Testing delete user route', () => {
  test.skip('Checking that the user is delete correctly', async () => {
    const result = await User.find({ email: 'jorgeagoiz@gmail.com' })
    const apiK = await uuidAPIKey.toAPIKey(result[0].key)

    await api.delete('/apikey')
      .query({ email: 'jorgeagoiz@gmail.com' })
      .query({ key: apiK })
      .expect(200)
  })

  test.skip('Checking if I sent a string that its not an email', async () => {
    const result = await User.find({ email: 'jorgeagoiz@gmail.com' })
    const apiK = await uuidAPIKey.toAPIKey(result[0].key)

    const response = await api.delete('/apikey')
      .query({ email: 'whatsupbuddy' })
      .query({ key: apiK })
      .expect(500)

    expect(response.body.message).toBe('Something went wrong.')
    expect(response.body.errors.errors[0].msg).toBe('Invalid value')
  })

  test('Checking if I sent a wrong api key, the user must not be deleted', async () => {
    const result = await User.find({ email: 'jorgeagoiz@gmail.com' })
    const apiK = await uuidAPIKey.toAPIKey(result[0].key)

    const response = await api.delete('/apikey')
      .query({ email: 'jorgeagoiz@gmail.com' })
      .query({ key: apiK })
      .expect(400)

    expect(response.body.message).toBe('Error, not found.')
  })
})

/* eslint-env node, jest */
