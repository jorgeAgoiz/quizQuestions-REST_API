/**
 * Questions Routes
 * @module Questions_Routes
 */

/* Packages */
const { Router } = require('express')
const router = Router()

/* Controllers and validators */
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

/* Routes */

/**
 * Create Question Route
 * @name POST
 * @path {POST} /questions
 * @body {String} category - Category accept six options: [arte, historia, ciencia, deporte, entretenimiento, geografia].
 * @body {String} format - Format accept two options: [multiple, boolean].
 * @body {String} question - Question.
 * @body {String[]} incorrectAnswers - Array of incorrects answers with maximum three strings.
 * @body {String} correctAnswer - Correct Answer.
 * @body {String} key - Api Key of user.
 * @code {201} Created. Question saved successfully.
 * @code {412} Precondition Failed. Errors in fields validation.
 * @code {401} Unauthorized. You don´t have permission to insert questions..
 * @code {500} Internal Server Error. Error, not saved.
 * @response {String} message "Question saved successfully.".
 * @response {Object} response - Saved question object.
 */
router.post('/questions', [
  validCategory,
  validFormat,
  validQuestion,
  validArrayIncorrectAnswers,
  validCorrectAnswer,
  validIncorrectAnswers
], insertQuestions)

/**
 * Create Question Route
 * @name GET
 * @path {GET} /questions
 * @query {String} category - (optional) Category accept seven options: [arte, historia, ciencia, deporte, entretenimiento, geografia].
 * @query {String} format - (optional) Format accept two options: [multiple, boolean].
 * @query {String} amount - (optional) By default ten, but maximum fourty.
 * @query {String} key - Api Key of user.
 * @code {200} Created. Question saved successfully.
 * @code {404} Not Foun. Error, not matches found.
 * @code {412} Precondition Failed. Errors in fields validation.
 * @code {401} Unauthorized. Error, wrong API KEY.
 * @code {500} Internal Server Error. Error, something went wrong.
 * @response {String} message "Your results.".
 * @response {Object[]} response - Questions requested.
 */

router.get('/questions', [
  validQueryCategory,
  validQueryFormat
], getQuestions)

module.exports = router
