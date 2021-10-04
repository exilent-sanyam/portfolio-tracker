const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectID = Schema.ObjectId

const tradesSchema = new Schema({
  _id: { type: String, required: true },

  noOfShares: {
    type: Number,
    default: 0,
  },

  trades: [
    {
      _id: { type: objectID, required: true },

      type: {
        type: String,
        enum: ['BUY', 'SELL'],
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      createdAt: { type: Date, required: true, default: new Date() },
      updatedAt: { type: Date, required: true, default: new Date() },
    },
  ],
})

const trades = mongoose.model('trades', tradesSchema, 'trades')
module.exports = trades
