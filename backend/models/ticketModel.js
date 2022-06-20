const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //relate this field to the user's objectId
      required: true,
      ref: 'User'  
      //without ref it doesn't know which collection I'm talking about whan I say ObjectId so in this field I refer to User schema
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);

// "The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name." --> tickets

// source: https://www.npmjs.com/package/mongoose
