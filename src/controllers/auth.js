const User = require('../models/user')

exports.signUp = async (req, res, next) => {
  const { email /* key */ } = req.body
  /* Aqui un generador de key */

  const user = await new User({
    email,
    key
  })
  user.save()
  console.log(user)
}
/* Empezaremos por esta ruta creando el usuario y dandole una api key,
hay que hacer una validación del email con express validator,
la api key la generaremos con alguna libreria,
configuraremos nodemailer para enviarle al usuario su api key,
tambien necesitaremos un metodo para dar de baja la api key cuando se pida o
cuando pase mucho tiempo sin usar. Todavia hay que decidirlo. */
