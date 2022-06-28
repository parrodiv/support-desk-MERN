const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //relate this field to the user's objectId
      required: true,
      ref: 'User',
      //without ref it doesn't know which collection I'm talking about whan I say ObjectId so in this field I refer to User schema
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId, //relate this field to the user's objectId
      required: true,
      ref: 'Ticket',
      //without ref it doesn't know which collection I'm talking about whan I say ObjectId so in this field I refer to User schema
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
    isStaff: {
      type: Boolean,
      default: false
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)
