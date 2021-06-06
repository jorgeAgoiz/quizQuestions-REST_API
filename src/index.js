if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

/* Routes */
const authRoutes = require('./routes/auth')
const questionsRoute = require('./routes/questions')
app.use('/', authRoutes)
app.use('/', questionsRoute)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(result => {
    app.listen(PORT, () => {
      console.log(`Listening in port ${PORT}...`)
    })
  }).catch(err => console.log(err))

/*
    Siguientes pasos a seguir:
    - Maquetar los correos.
    - Comenzar con las rutas de petición de preguntas.
    - Construir la coleccion de preguntas en nuestra base de datos.
*/
