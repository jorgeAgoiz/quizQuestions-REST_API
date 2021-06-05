const { Router } = require('express')
const router = Router()

const { signUp } = require('../controllers/auth')

router.post('/signup', signUp)

module.exports = router
