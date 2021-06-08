const { Router } = require('express')
const { insertQuestions, getQuestions } = require('../controllers/questions')
const {
  validCategory,
  validFormat,
  validQuestion,
  validArrayIncorrectAnswers,
  validCorrectAnswer,
  validIncorrectAnswers,
  validQueryCategory,
  validQueryFormat
} = require('../utils/validators')
const router = Router()

router.post('/questions', [
  validCategory,
  validFormat,
  validQuestion,
  validArrayIncorrectAnswers,
  validCorrectAnswer,
  validIncorrectAnswers
], insertQuestions)

router.get('/questions', [
  validQueryCategory,
  validQueryFormat
], getQuestions)

module.exports = router
