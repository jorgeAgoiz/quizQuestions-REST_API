const User = require('../models/user')
const { v4: uuidv4 } = require('uuid')
const { transporter } = require('../utils/nodemailer')
const { validationResult } = require('express-validator')

const USER = process.env.MAIL_NAME

// "/apikey" => POST
exports.signUp = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: 'Something went wrong.', errors })
  }

  const { email } = req.body
  const timeAccess = new Date(Date.now())/* Actualizar con cada peticion a la api */

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const mailSended = await transporter.sendMail({
        from: `"Questions Quiz" ${USER}`,
        to: email,
        subject: 'You API KEY',
        text: `You are triying to request an API key and you are already registered with a key.
        This is your API KEY to use "Questions Quiz" service: ${existingUser.key}`
        /* html: `` */
      })

      return res.status(401).json({ message: 'This email are registered in Quiz Questions API. Check your email inbox.', response: mailSended.response })
    }
    const key = uuidv4()
    const newUser = await new User({
      email,
      key,
      last_access: timeAccess.toLocaleString()
    })
    newUser.save()

    const mailSended = await transporter.sendMail({
      from: `"Questions Quiz" ${USER}`,
      to: email,
      subject: 'Your API KEY',
      text: `This is your API KEY to use "Questions Quiz" ${key}`
    /* html: "<b>Hello world?</b>", */
    })

    return res.status(201).json({ message: 'Email registered, API key sended.', response: mailSended.response })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Something went wrong, try it again.' })
  }
}
/* Cosas ha implementar en esta ruta:
  - Tenemos que maquetar el correo electronico.
   */

// "/apikey" => DELETE
exports.deleteUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: 'Something went wrong.', errors })
  }

  const { email } = req.body
  const deletedUser = await User.findOneAndDelete({ email })

  !deletedUser
    ? res.status(500).json({ message: 'Error, not found.' })
    : res.status(200).json({ message: 'Deleted user.', deleted_user: { email: deletedUser.email, id: deletedUser._id } })
}
/* En esta ruta tengo que plantear si quiero enviar un correo de confirmación al borrado del usuario */
