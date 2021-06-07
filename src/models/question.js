const mongoose = require('mongoose')
mongoose.pluralize(null)

const Schema = mongoose.Schema

const questionSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  incorrectAnswers: [
    {
      type: String,
      required: true
    }
  ],
  correctAnswer: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Questions', questionSchema)
