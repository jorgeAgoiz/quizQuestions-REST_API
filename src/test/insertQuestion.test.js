const supertest = require('supertest')
const app = require('../index')
const Questions = require('../models/question')

const api = supertest(app)

beforeAll(async () => {
  await Questions.deleteMany({})
})

describe.skip('Testing insert questions route', () => {
  test('Checking if I insert a valid question. I expect 201 status code and Content-Type JSON', async () => {
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

  test('Check if I send a empty api key. I expect status code 401.', async () => {
    const newQuestion = {
      key: '',
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

  test('Check if I send a wrong category. I expect status code 412.', async () => {
    const newQuestion = {
      key: 'QKFTYNK-YED4EMV-MT5TVD8-90Q8R76',
      category: 'categoryDePrueba',
      format: 'boolean',
      question: 'El estadio del Bayern de Munich se llama Allianz Arena',
      incorrectAnswers: [
        'False'
      ],
      correctAnswer: 'True'
    }
    const response = await api.post('/questions')
      .send(newQuestion)
      .expect(412)

    expect(response.body.message).toBe('Errors in fields validation.')
  })

  test('Check if I send a wrong format. I expect status code 412.', async () => {
    const newQuestion = {
      key: 'QKFTYNK-YED4EMV-MT5TVD8-90Q8R76',
      category: 'deporte',
      format: 'incorrectFormat',
      question: 'El estadio del Bayern de Munich se llama Allianz Arena',
      incorrectAnswers: [
        'False'
      ],
      correctAnswer: 'True'
    }
    const response = await api.post('/questions')
      .send(newQuestion)
      .expect(412)

    expect(response.body.errors.errors[0].msg).toBe('You must enter a valid question format.')
    expect(response.body.errors.errors[0].param).toBe('format')
  })

  test('Check if I send more than 3 incorrect answers. I expect status code 412.', async () => {
    const newQuestion = {
      key: 'QKFTYNK-YED4EMV-MT5TVD8-90Q8R76',
      category: 'deporte',
      format: 'multiple',
      question: 'El estadio del Bayern de Munich se llama...',
      incorrectAnswers: [
        'El Calderon',
        'Old Trafford',
        'Emirates Stadium',
        'Camp Nou'
      ],
      correctAnswer: 'Allianz Arena'
    }
    const response = await api.post('/questions')
      .send(newQuestion)
      .expect(412)

    expect(response.body.errors.errors[0].msg).toBe('You must enter a valid array of incorrect answers.')
    expect(response.body.errors.errors[0].param).toBe('incorrectAnswers')
  })

  test('Check if I send incorrect value inside of incorrectAnswers array. I expect status code 412.', async () => {
    const newQuestion = {
      key: 'QKFTYNK-YED4EMV-MT5TVD8-90Q8R76',
      category: 'deporte',
      format: 'multiple',
      question: 'El estadio del Bayern de Munich se llama...',
      incorrectAnswers: [
        'El Calderon',
        '', // empty value
        'Emirates Stadium'
      ],
      correctAnswer: 'Allianz Arena'
    }
    const response = await api.post('/questions')
      .send(newQuestion)
      .expect(412)

    expect(response.body.errors.errors[0].msg).toBe('Invalid value')
    expect(response.body.errors.errors[0].param).toBe('incorrectAnswers[1]')
  })

  test('Check if I send incorrect value in correctAnswer field. I expect status code 412.', async () => {
    const newQuestion = {
      key: 'QKFTYNK-YED4EMV-MT5TVD8-90Q8R76',
      category: 'deporte',
      format: 'multiple',
      question: 'El estadio del Bayern de Munich se llama...',
      incorrectAnswers: [
        'El Calderon',
        'Camp Noue',
        'Emirates Stadium'
      ],
      correctAnswer: '' // Only strings accepted
    }
    const response = await api.post('/questions')
      .send(newQuestion)
      .expect(412)

    expect(response.body.errors.errors[0].msg).toBe('Invalid value')
    expect(response.body.errors.errors[0].param).toBe('correctAnswer')
  })
})

/* eslint-env node, jest */
