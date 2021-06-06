const { Router } = require('express')
const { insertQuestions } = require('../controllers/questions')
const router = Router()

router.post('/questions', insertQuestions)

module.exports = router

/* Ahora a desarrollar el controlador de peticion de preguntas y el objeto
pregunta de la base de datos  */
