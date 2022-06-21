const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desc  get user tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async(req, res) => {

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  //NON E' NECESSARIO OTTENERE L'USER ESSENDO CHE ATTRAVERSO LA FUNZIONE protect OTTENIAMO GIA' L'USER CON authMiddleware
  
  //Mongoose provides a 'getter' function on the Model for us that returns the _id as a string value. You access that getter with Query.id or Model.id
  // So id won't show in the console log of the query because that's just an object with key value pairs and the getter function is on the prototype.

  if(!user){
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({user: req.user.id})

  res.status(200).json(tickets) 
})

// @desc  create new ticket
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async(req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add product and description');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new Error('User not found');
  }

  // Create ticket 
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })

  res.status(201).json(ticket);
})

module.exports = {
  getTickets,
  createTicket
}