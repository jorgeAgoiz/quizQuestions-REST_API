const User = require('../models/user')
/* const { v4: uuidv4 } = require('uuid') */
const uuidAPIKey = require('uuid-apikey')
const { transporter } = require('../utils/nodemailer')
const { validationResult } = require('express-validator')
const { mailTemplate, reminderText, newKeyText } = require('../utils/mailTemplate')

const USER = process.env.MAIL_NAME

// "/apikey" => POST
exports.signUp = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: 'Something went wrong.', errors })
  }

  const { email } = req.body
  const timeAccess = new Date(Date.now())

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const apiK = await uuidAPIKey.toAPIKey(existingUser.key)

      const textA = reminderText(apiK)
      const mailSended = await transporter.sendMail({
        from: `"Questions Quiz" ${USER}`,
        to: email,
        subject: 'You API KEY',
        html: mailTemplate(textA, apiK, email)
      })

      return res.status(401).json({ message: 'This email are registered in Quiz Questions API. Check your email inbox.', response: mailSended.response })
    }
    const { uuid, apiKey } = await uuidAPIKey.create()
    const newUser = new User({
      email,
      key: uuid,
      lastAccess: timeAccess.toLocaleString(),
      admin: false
    })
    newUser.save()

    const textB = newKeyText(apiKey)
    const mailSended = await transporter.sendMail({
      from: `"Questions Quiz" ${USER}`,
      to: email,
      subject: 'Your API KEY',
      html: mailTemplate(textB, apiKey, email)
    })

    return res.status(201).json({ message: 'Email registered, API key was sent to your email.', response: mailSended.response })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong, try it again.', error: error.message })
  }
}

// "/apikey" => DELETE
exports.deleteUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: 'Something went wrong.', errors })
  }

  try {
    const { email, key } = req.query

    if (!key) {
      return res.status(401).json({ message: 'Error, unauthorized.' })
    }
    const apiKey = await uuidAPIKey.toUUID(key)

    const deletedUser = await User.findOneAndDelete({ email, key: apiKey })

    !deletedUser
      ? res.status(400).json({ message: 'Error, not found.' })
      : res.status(200).json({ message: 'Deleted user.', deleted_user: { email: deletedUser.email, id: deletedUser._id } })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong.', error: error.message })
  }
}
