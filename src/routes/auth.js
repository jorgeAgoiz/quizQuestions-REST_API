const { Router } = require('express')
const router = Router()

const { signUp, deleteUser } = require('../controllers/auth')
const { validEmail } = require('../utils/validators')

router.post('/apikey', validEmail, signUp)
router.delete('/apikey', validEmail, deleteUser)

module.exports = router
