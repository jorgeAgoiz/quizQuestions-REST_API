const Questions = require('../models/question')
const { validationResult } = require('express-validator')

exports.insertQuestions = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('Error')
    return res.status(500).json({ message: 'Something went wrong.', errors })
  }

  const { category, format, question, incorrectAnswers, correctAnswer } = req.body

  const newQuestion = await new Questions({
    category,
    format,
    question,
    incorrectAnswers,
    correctAnswer
  })

  newQuestion.save()
  console.log(newQuestion)

  return res.status(200).json({ message: 'Funciona perfecto', question: newQuestion })
}
/* Cosas a implementar en la ruta post de insertar preguntas:
 - Validacion de los campos a insertar.
 - Decidir si pido la api key para insertarlas tambien.
 */
