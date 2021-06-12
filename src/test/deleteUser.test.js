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

describe.skip('Testing delete user route', () => {
  test('Checking that the user is delete correctly', async () => {
    const result = await User.find({ email: 'jorgeagoiz@gmail.com' })
    const apiK = await uuidAPIKey.toAPIKey(result[0].key)

    await api.delete('/apikey')
      .query({ email: 'jorgeagoiz@gmail.com' })
      .query({ key: apiK })
      .expect(200)
  })

  test('Checking if I sent a string that its not an email', async () => {
    const result = await User.find({ email: 'jorgeagoiz@gmail.com' })
    const apiK = await uuidAPIKey.toAPIKey(result[0].key)

    const response = await api.delete('/apikey')
      .query({ email: 'whatsupbuddy' })
      .query({ key: apiK })
      .expect(500)

    expect(response.body.message).toBe('Something went wrong.')
    expect(response.body.errors.errors[0].msg).toBe('Invalid value')
  })

  test('Checking if I dont sent an api key, the user must not be deleted', async () => {
    const response = await api.delete('/apikey')
      .query({ email: 'jorgeagoiz@gmail.com' })
      .expect(401)

    expect(response.body.message).toBe('Error, unauthorized.')
  })

  test('Checking if I sent a wrong string as api key', async () => {
    const response = await api.delete('/apikey')
      .query({ email: 'jorgeagoiz@gmail.com' })
      .query({ key: 'wrong-api-key' })
      .expect(401)
    expect(response.body.message).toBe('Error, unauthorized.')
  })

  test('Checking if I sent wrong data and the user is not found', async () => {
    const result = await User.find({ email: 'jorgeagoiz@gmail.com' })

    const response = await api.delete('/apikey')
      .query({ email: result[0].email })
      .query({ key: 'J8RPY63-T4EM38R-MJK7S6G-C58KFN1' })// Random API KEY
      .expect(400)

    expect(response.body.message).toBe('Error, not found.')
  })
})

/* eslint-env node, jest */
