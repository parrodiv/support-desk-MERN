const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token 

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1] //['Bearer' '<token>']

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded);

      //Get user from token
      req.user = await User.findById(decoded.id).select('-password') 
      //otteniamo l'user escludendo il campo password

      // console.log(req.user)
//     {
// [0]   _id: new ObjectId("62a2f48f2e0b806e9cce2ba7"),
// [0]   name: 'Aleeeeee',
// [0]   email: 'alecaro@gmail.com',
// [0]   isAdmin: false,
// [0]   createdAt: 2022-06-10T07:36:47.092Z,
// [0]   updatedAt: 2022-06-10T07:36:47.092Z,
// [0]   __v: 0
// [0]  }

      next()
    } catch (error) {
      console.log(error);
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if(!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
})

module.exports = {protect}