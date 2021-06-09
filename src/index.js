if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())

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
    - Usar compresión gzip para peticiones.
    - Usar clusters para mejorar la performance.
    - Hashear la api key.
*/
