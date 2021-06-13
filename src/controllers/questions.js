const Questions = require('../models/question')
const User = require('../models/user')
const uuidAPIKey = require('uuid-apikey')
const { validationResult } = require('express-validator')
const { setAmount } = require('../utils/helperFunctions')

exports.insertQuestions = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(412).json({ message: 'Errors in fields validation.', errors })
  }

  const { category, format, question, incorrectAnswers, correctAnswer, key } = req.body

  try {
    if (!key || !uuidAPIKey.isAPIKey(key)) {
      return res.status(401).json({ message: 'You don´t have permission to insert questions.', authorization: false })
    }

    const apiKey = await uuidAPIKey.toUUID(key)
    const adminUser = await User.findOne({ key: apiKey })

    if (!adminUser.admin || !adminUser) {
      return res.status(401).json({ message: 'You don´t have permission to insert questions.', authorization: adminUser.admin })
    }

    const newQuestion = new Questions({
      category,
      format,
      question,
      incorrectAnswers,
      correctAnswer
    })
    const savedQuestion = await newQuestion.save()
    return res.status(201).json({ message: 'Question saved successfully.', question: savedQuestion })
  } catch (error) {
    return res.status(500).json({ message: 'Error, not saved.', error: error.message })
  }
}

exports.getQuestions = async (req, res) => {
  /* Aqui metodo para identificar la api key */
  const { key } = req.query
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(412).json({ message: 'Errors in fields validation.', errors })
  }

  try {
    if (!key) {
      return res.status(401).json({ message: 'Error, unauthorized.' })
    }

    /* Checkeamos y actualizamos el usuario que esta realizando la petición  */
    const apiKey = await uuidAPIKey.toUUID(key)
    const userAuthorized = await User.findOne({ key: apiKey })
    if (!userAuthorized) {
      return res.status(401).json({ message: 'Error, wrong API KEY.' })
    }
    const timeAccess = new Date(Date.now())
    userAuthorized.lastAccess = timeAccess.toLocaleString()
    userAuthorized.save()
    /* Checkeamos la cantidad solicitada */
    const amount = setAmount(parseInt(req.query.amount))

    const filters = {}
    if (req.query.category) {
      filters.category = req.query.category
    }
    if (req.query.format) {
      filters.format = req.query.format
    }

    Questions.findRandom(filters, { _id: 0 }, { limit: amount }, (err, result) => {
      if (result === undefined) {
        return res.status(404).json({ message: 'Error, not matches found.' })
      }
      if (!err) {
        return res.status(200).json({ message: 'Your results.', data: result })
      }
      return res.status(500).json({ message: 'Error, something went wrong.', error: err.message })
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error, something went wrong.', error: error.message })
  }
}
