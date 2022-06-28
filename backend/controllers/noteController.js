const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')

// @desc  get notes for a ticket
// @route  GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId})

  console.log(req);

  res.status(200).json(notes) // it will be response.data in frontend
})


// @desc  create note for a ticket
// @route  POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id
    })

  console.log(req);

  res.status(200).json(note) // it will be response.data in frontend
})

module.exports = {
  getNotes,
  addNote
}
