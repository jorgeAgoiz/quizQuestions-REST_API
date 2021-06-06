const User = require('../models/user')
const { v4: uuidv4 } = require('uuid')
const { transporter } = require('../utils/nodemailer')

const USER = process.env.MAIL_NAME

// "/apikey" => POST
exports.signUp = async (req, res, next) => {
  const { email } = req.body
  const key = uuidv4()
  const timeAccess = new Date(Date.now())

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      const mailSended = await transporter.sendMail({
        from: `"Questions Quiz" ${USER}`,
        to: email,
        subject: 'You API KEY',
        text: `You are triying to request an API key and you are already registered with a key. 
        This is your API KEY to use "Questions Quiz" service: ${existingUser.key}`
      /* html: "<b>Hello world?</b>", */
      })

      return res.status(401).json({ message: 'This email are registered in Quiz Questions API. Check your email inbox.', response: mailSended.response })
    }

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

exports.deleteUser = async (req, res, next) => {
  console.log('funciono')
  return res.status(201).json({ message: 'Everything is OK.' })
}
