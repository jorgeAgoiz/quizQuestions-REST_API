const mongoose = require('mongoose')
mongoose.pluralize(null)

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  key: {
    type: String,
    required: true,
    unique: true
  },
  last_access: {
    type: Date,
    required: true
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
/* Aqui tenemos que mejorar la performance del last access usando el metodo currentTime de mongo */
