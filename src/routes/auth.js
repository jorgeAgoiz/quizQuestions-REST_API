/**
 * Auth Routes
 * @module Auth_Routes
 */

/* Packages */
const { Router } = require('express')
const router = Router()

/* Controllers and utils */
const { signUp, deleteUser } = require('../controllers/auth')
const { validEmail, validQueryEmail } = require('../utils/validators')

/* Routes */

/**
 * Create User Route
 * @name POST
 * @path {POST} /apikey
 * @body {String} email - User email.
 * @code {201} Created. The user was created.
 * @code {401} Unauthorized. User already exists.
 * @code {500} Internal Server Error. Something went wrong.
 * @response {String} message "Email registered, API key was sent to your email".
 * @response {Object} response - Node Mailer Object.
 */
router.post('/apikey', validEmail, signUp)

/**
 * Delete User Route
 * @name DELETE
 * @path {DELETE} /apikey
 * @query {String} email - User email.
 * @query {String} key - Api Key of user.
 * @code {200} Deleted. User was delete.
 * @code {400} Bad Request. User not found.
 * @code {401} Unauthorized. You don´t have permissions.
 * @code {500} Internal Server Error. Something went wrong.
 * @response {String} message "Deleted user".
 * @response {Object} response - Deleted User Object.
 */
router.delete('/apikey', validQueryEmail, deleteUser)

module.exports = router
