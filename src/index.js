if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT

const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()

/* Routes */
const authRoutes = require('./routes/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', authRoutes)

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}...`)
})

/*
    Siguientes pasos a seguir:
    - Crear BD Users
    - Validar el registro de usuarios
    - Configurar nodeMailer para enviar una api key por correo
*/
