const { Router } = require('express')
const { insertQuestions } = require('../controllers/questions')
const {
  validCategory,
  validFormat,
  validQuestion,
  validArrayIncorrectAnswers,
  validCorrectAnswer,
  validIncorrectAnswers
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

module.exports = router

/* Ahora a desarrollar el controlador de peticion de preguntas y el objeto
pregunta de la base de datos  */
