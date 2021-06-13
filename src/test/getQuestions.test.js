const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

describe.skip('Testing get questions route', () => {
  test('Checking a simply query without any query params. Default petition are 10 questions with mixing categories and mixing formats', async () => {
    const result = await api.get('/questions')
      .query({ key: 'G8E3JK0-QFR4EE1-G6KFCW8-ZFAM42S' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(result.body.message).toBe('Your results.')
    expect(Array.isArray(result.body.data)).toBe(true)
    expect(result.body.data).toHaveLength(10)
  })

  test('Check if I pass as amount number zero. I must recieve 10 questions.', async () => {
    const result = await api.get('/questions')
      .query({ key: 'G8E3JK0-QFR4EE1-G6KFCW8-ZFAM42S', amount: 10 })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(result.body.data).toHaveLength(10)
    expect(Array.isArray(result.body.data)).toBe(true)
  })

  test('Check if I pass an incorrect format questions. I must recieve 412 status code.', async () => {
    const result = await api.get('/questions')
      .query({ key: 'G8E3JK0-QFR4EE1-G6KFCW8-ZFAM42S', format: 'incorrectFormat' })
      .expect(412)

    expect(result.body.errors.errors[0].msg).toBe('You must enter a valid question format.')
    expect(result.body.errors.errors[0].param).toBe('format')
  })

  test('Check if I pass an incorrect question category. I must recieve 412 status code.', async () => {
    const result = await api.get('/questions')
      .query({ key: 'G8E3JK0-QFR4EE1-G6KFCW8-ZFAM42S', category: 'nadadenada' })
      .expect(412)

    expect(result.body.errors.errors[0].msg).toBe('You must enter a valid category')
    expect(result.body.errors.errors[0].param).toBe('category')
  })

  test('Check if I pass an amount bigger than this category stack. I expect 200 status code and maximum questions available of this category.', async () => {
    await api.get('/questions')
      .query({ key: 'G8E3JK0-QFR4EE1-G6KFCW8-ZFAM42S', category: 'deporte', amount: 30 })
      .expect(200)
  })

  test('Check if I request an empty category. I expect 404 status code.', async () => {
    const result = await api.get('/questions')
      .query({ key: 'G8E3JK0-QFR4EE1-G6KFCW8-ZFAM42S', category: 'arte' })
      .expect(404)

    expect(result.body.message).toBe('Error, not matches found.')
  })
})
/* eslint-env node, jest */
