const { body } = require('express-validator')

module.exports = {
  validEmail: body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .notEmpty()
    .withMessage('You must enter a valid email.')
}
