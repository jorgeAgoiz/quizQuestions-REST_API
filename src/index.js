if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

/* Routes */
const authRoutes = require('./routes/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', authRoutes)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(PORT, () => {
      console.log(`Listening in port ${PORT}...`)
    })
  }).catch(err => console.log(err))

/*
    Siguientes pasos a seguir:
    - Crear BD Users
    - Validar el registro de usuarios
    - Configurar nodeMailer para enviar una api key por correo
*/
