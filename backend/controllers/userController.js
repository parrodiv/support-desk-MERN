const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

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
      email: user.email
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
  res.send('Login User')
})
  
  module.exports = {
    registerUser,
    loginUser,
  }