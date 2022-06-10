const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc  Register a new user
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
  console.log(req.body); 
  //get undefined because we need to set the body parser middleware in server.js

  const {name, email, password} = req.body

  // Validadion
  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if a user already exists
  const userExists = await User.findOne({email: email})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

})

// @desc  Login a user
// @route  /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  
  const user = await User.findOne({email: email})

  // Check user and passwords march (plaintext and hashed)
  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401) //Unauthorized
    throw new Error('Invalid credentials')
  }
})

// @desc  get current user
// @route  /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
  res.send('me')
})

// Generate token function
const generateToken = (id) => {
  return jwt.sign({id: id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
// The token is stored in the browsers localStorage.
// We can't store it in the database because the token is what authenticates the user before we allow them to access data from our database. So the token needs to be stored on the client.
  
module.exports = {
  registerUser,
  loginUser,
  getMe
}