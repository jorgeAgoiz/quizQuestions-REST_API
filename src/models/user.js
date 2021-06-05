const mongoose = require('mongoose')
mongoose.pluralize(null)

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
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
