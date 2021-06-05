const User = require('../models/user')
const { v4: uuidv4 } = require('uuid')
const { transporter } = require('../utils/nodemailer')

const USER = process.env.MAIL_NAME

exports.signUp = async (req, res, next) => {
  const { email } = req.body
  const key = uuidv4()
  const user = await new User({
    email,
    key
  })
  user.save()

  const mailSended = await transporter.sendMail({
    from: `"Questions Quiz" ${USER}`,
    to: email,
    subject: 'Your API KEY',
    text: `This is your API KEY to use "Questions Quiz" ${key}`
    /* html: "<b>Hello world?</b>", */
  })

  console.log(mailSended)
  console.log(user)

  return res.json({ message: 'All perfect dude.' })
}
/* Empezaremos por esta ruta creando el usuario y dandole una api key,
hay que hacer una validación del email con express validator,
la api key la generaremos con alguna libreria,
configuraremos nodemailer para enviarle al usuario su api key,
tambien necesitaremos un metodo para dar de baja la api key cuando se pida o
cuando pase mucho tiempo sin usar. Todavia hay que decidirlo. */
