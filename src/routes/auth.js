const { Router } = require('express')
const router = Router()

const { signUp, deleteUser } = require('../controllers/auth')

router.post('/apikey', signUp)
router.delete('/apikey', deleteUser)

module.exports = router
