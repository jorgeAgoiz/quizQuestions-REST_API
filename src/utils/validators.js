const { body } = require('express-validator')

module.exports = {
  validEmail: body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .notEmpty()
    .withMessage('You must enter a valid email.'),
  validCategory: body('category')
    .trim()
    .toLowerCase()
    .isString()
    .notEmpty()
    .isIn([
      'deporte',
      'entretenimiento',
      'arte',
      'Geografia',
      'ciencia',
      'historia'
    ])
    .withMessage('You must enter a valid category'),
  validFormat: body('format')
    .trim()
    .toLowerCase()
    .isString()
    .notEmpty()
    .isIn([
      'multiple',
      'boolean'
    ])
    .withMessage('You must enter a valid question format.'),
  validQuestion: body('question')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 10, max: 200 })
    .withMessage('You must enter a valid question.'),
  validArrayIncorrectAnswers: body('incorrectAnswers')
    .isArray({ min: 1, max: 3 })
    .withMessage('You must enter a valid array of incorrect answers.'),
  validIncorrectAnswers: body('incorrectAnswers.*')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 2, max: 50 })
    .withMessage('You must enter a valid incorrect answer.'),
  validCorrectAnswer: body('correctAnswer')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .withMessage('You must enter a valid correct answer.')
}
