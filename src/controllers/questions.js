const Questions = require('../models/question')

exports.insertQuestions = async (req, res, next) => {
  const newQuestion = await new Questions({
    category: 'Deportes',
    format: 'multiple',
    question: 'How many NBA titles have Lebron James?',
    incorrect_answers: ['3', '1', '6'],
    correct_answer: '4'
  })

  newQuestion.save()
  console.log(newQuestion)

  return res.status(200).json({ message: 'Funciona perfecto', question: newQuestion })
}
/* Cosas a implementar en la ruta post de insertar preguntas:
 - Validacion de los campos a insertar.
 - Decidir si pido la api key para insertarlas tambien.
 */
