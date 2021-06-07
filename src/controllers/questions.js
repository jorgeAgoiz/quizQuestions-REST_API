const Questions = require('../models/question')
const { validationResult } = require('express-validator')

exports.insertQuestions = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('Error')
    return res.status(412).json({ message: 'Something went wrong.', errors })
  }

  const { category, format, question, incorrectAnswers, correctAnswer } = req.body

  try {
    const newQuestion = await new Questions({
      category,
      format,
      question,
      incorrectAnswers,
      correctAnswer
    })
    const savedQuestion = newQuestion.save()
    return res.status(201).json({ message: 'Question saved successfully.', question: savedQuestion })
  } catch (error) {
    return res.status(500).json({ message: 'Error, not saved.', error })
  }
}
/* Cosas a implementar en la ruta post de insertar preguntas:
 - Decidir si pido la api key para insertarlas tambien.
 */
