const express = require('express')
const router = express.Router()

const {registerUser, loginUser } = require('../controllers/userController')

router.post('/', registerUser ) //localhost:5000/api/users

router.post('/login', loginUser ) //localhost:5000/api/users/login


module.exports = router