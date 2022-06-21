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


// @desc  get user ticket
// @route  GET /api/tickets/:id (id del ticket "_id")
// @access Private
const getTicket = asyncHandler(async(req, res) => {

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if(!user){
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  //otteniamo l'id del ticket dal URL (:id)

  if(!ticket){
    res.status(404)
    throw new Error('Ticket not found')
  }

  // Check if it is the user's ticket
  if(ticket.user.toString() !== req.user.id){
    // req.user.id is the logged in user
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket) 
})

// @desc  create new ticket
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async(req, res) => {
  // console.log(req.body) //{product: 'iPhone', description:'non si accende'}

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

// @desc  delete user ticket
// @route  DELETE /api/tickets/:id (id del ticket "_id")
// @access Private
const deleteTicket = asyncHandler(async(req, res) => {

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if(!user){
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  //otteniamo l'id del ticket dal URL (:id)

  if(!ticket){
    res.status(404)
    throw new Error('Ticket not found')
  }

  // Check if it is the user's ticket
  if(ticket.user.toString() !== req.user.id){
    // req.user.id is the logged in user
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.remove()

  res.status(200).json({success: true}) 
})


// @desc  update user ticket
// @route  PUT /api/tickets/:id (id del ticket "_id")
// @access Private
const updateTicket = asyncHandler(async(req, res) => {

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if(!user){
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  //otteniamo l'id del ticket dal URL (:id)

  if(!ticket){
    res.status(404)
    throw new Error('Ticket not found')
  }

  // Check if it is the user's ticket
  if(ticket.user.toString() !== req.user.id){
    // req.user.id is the logged in user
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedTicket) 
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket
}