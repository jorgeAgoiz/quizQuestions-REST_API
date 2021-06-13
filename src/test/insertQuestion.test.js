const supertest = require('supertest')
const app = require('../index')
const Questions = require('../models/question')

const api = supertest(app)

beforeAll(async () => {
  await Questions.deleteMany({})
})

describe('Testing insert questions route', () => {
  test.skip('Checking if I insert a valid question. I expect 201 status code and Content-Type JSON', async () => {
    const newQuestion = {
      key: 'QKFTYNK-YED4EMV-MT5TVD8-90Q8R76',
      category: 'deporte',
      format: 'boolean',
      question: 'El estadio del Bayern de Munich se llama Allianz Arena',
      incorrectAnswers: [
        'False'
      ],
      correctAnswer: 'True'
    }
    const response = await api.post('/questions')
      .send(newQuestion)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.message).toBe('Question saved successfully.')
  })
  test('Check if I use a wrong api key. I expect status code 401.', async () => {
    const newQuestion = {
      key: 'QKFTYNK-YED4EMV-MT5TVD8-90Q8R7644',
      category: 'deporte',
      format: 'boolean',
      question: 'El estadio del Bayern de Munich se llama Allianz Arena',
      incorrectAnswers: [
        'False'
      ],
      correctAnswer: 'True'
    }
    const response = await api.post('/questions')
      .send(newQuestion)
      .expect(401)

    expect(response.body.message).toBe('You don´t have permission to insert questions.')
  })
})
/* eslint-env node, jest */
