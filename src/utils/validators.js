const { body, query } = require('express-validator')

module.exports = {
  validEmail: body('email')// BODY from POST USERS *******************
    .trim()
    .toLowerCase()
    .isEmail()
    .notEmpty()
    .withMessage('You must enter a valid email.'),
  validCategory: body('category')// BODY from POST QUESTIONS *******************
    .trim()
    .toLowerCase()
    .isString()
    .notEmpty()
    .isIn([
      'deporte',
      'entretenimiento',
      'arte',
      'geografia',
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
    .isLength({ min: 1, max: 50 })
    .withMessage('You must enter a valid incorrect answer.'),
  validCorrectAnswer: body('correctAnswer')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .withMessage('You must enter a valid correct answer.'),
  validQueryCategory: query('category')// QUERIES from GET QUESTIONS *******************
    .trim()
    .toLowerCase()
    .isIn([
      'deporte',
      'entretenimiento',
      'arte',
      'geografia',
      'ciencia',
      'historia',
      null
    ])
    .withMessage('You must enter a valid category'),
  validQueryFormat: query('format')
    .trim()
    .toLowerCase()
    .isIn([
      'multiple',
      'boolean',
      null
    ])
    .withMessage('You must enter a valid question format.'),
  validQueryEmail: query('email')// QUERY from DELETE USERS *******************
    .trim()
    .toLowerCase()
    .isEmail()
    .notEmpty()
    .withMessage('You must enter a valid email.')

}
