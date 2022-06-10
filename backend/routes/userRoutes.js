const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser); //localhost:5000/api/users

router.post('/login', loginUser); //localhost:5000/api/users/login

router.get('/me', protect, getMe);

module.exports = router;
