const Questions = require('../models/question')
const User = require('../models/user')
const { validationResult } = require('express-validator')

exports.insertQuestions = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('Error')
    return res.status(412).json({ message: 'Something went wrong.', errors })
  }

  const { category, format, question, incorrectAnswers, correctAnswer, key } = req.body

  try {
    const adminUser = await User.findOne({ key })

    if (!adminUser.admin || !adminUser) {
      return res.status(401).json({ message: 'You don´t have permission to insert questions.', authorization: adminUser.admin })
    }

    const newQuestion = await new Questions({
      category,
      format,
      question,
      incorrectAnswers,
      correctAnswer
    })
    const savedQuestion = await newQuestion.save()
    return res.status(201).json({ message: 'Question saved successfully.', question: savedQuestion })
  } catch (error) {
    return res.status(500).json({ message: 'Error, not saved.', error })
  }
}

exports.getQuestions = async (req, res, next) => {
  return console.log('Funcionando')
}
/* En esta ruta empieza lo fuerte:
  - Validación de campos.
  - Configurar queries.
  - Experimentar con la paginación.
  - Actualizar ultima peticion de usuario cuando pidan preguntas. */
