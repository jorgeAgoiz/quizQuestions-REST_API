if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
/* Environment variables */
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI/* Base de datos modo test */

/* Packages */
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const { limiter } = require('./utils/rateLimiter')

/* Middlewares */
const app = express()
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(limiter)

/* Routes */
const authRoutes = require('./routes/auth')
const questionsRoute = require('./routes/questions')
app.use('/', authRoutes)
app.use('/', questionsRoute)

app.use((error, request, response, next) => {
  console.log(error)
})

/* Mongoose Connection */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(result => {
    app.listen(PORT)
  }).catch(err => console.log(err))

module.exports = app
