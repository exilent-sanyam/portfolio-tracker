const mongoose = require('mongoose')
const trades = require('../../../database/schema')
const { ErrorHandler } = require('../../utils/errors.utils')
const objectID = mongoose.Types.ObjectId

const fetchSecuritiesByTicker = async ticker => {
  const security = await trades.findOne(
    {
      _id: ticker,
    },
    /**
     * The object below is projection,for selecting just `noOfShares`
     */
    { noOfShares: 1 },
  )
  return security
}

const addTradeByTicker = async ({ ticker, type, quantity, price }, currentShares) => {
  const now = new Date()
  const tradeID = objectID()
  await trades.updateOne(
    {
      _id: ticker,
    },

    {
      $push: {
        trades: {
          _id: tradeID,
          type,
          quantity,
          price,
          createdAt: now,
          updatedAt: now,
        },
      },

      $set: {
        noOfShares: currentShares,
      },
    },

    {
      upsert: true,
    },
  )
  return { tradeID }
}

const fetchSecuritiesByTradeID = async tradeID => {
  if (!objectID.isValid(tradeID)) {
    throw new ErrorHandler(400, 'Not a valid tradeID')
  }

  const security = await trades.findOne(
    {
      'trades._id': new mongoose.Types.ObjectId(tradeID),
    },

    {
      trades: {
        $elemMatch: {
          _id: new mongoose.Types.ObjectId(tradeID),
        },
      },
      noOfShares: 1,
    },
  )

  if (!security) {
    throw new ErrorHandler(404, 'No data with corresponding tradeID found')
  }

  const [result] = security.trades
  return { security: result, noOfShares: security.noOfShares }
}

const updateTradeByTradeID = async (tradeID, type, quantity, price, updatedNumbersOfShare) => {
  const now = new Date()
  await trades.updateOne(
    {
      'trades._id': tradeID,
    },

    {
      'trades.$.type': type,
      'trades.$.quantity': quantity,
      'trades.$.price': price,
      'trades.$.updatedAt': now,
      $set: {
        noOfShares: updatedNumbersOfShare,
      },
    },
  )
  return { noOfShares: updatedNumbersOfShare }
}

const deleteTradeByTradeID = async (tradeID, updatedCount) => {
  await trades.updateOne(
    {
      'trades._id': tradeID,
    },

    {
      $pull: {
        trades: {
          _id: tradeID,
        },
      },

      $set: {
        noOfShares: updatedCount,
      },
    },
  )

  return {
    tradeID,
    noOfShares: updatedCount,
  }
}

const fetchAllTrades = async () => {
  const result = await trades.find({})
  return result
}

module.exports = {
  fetchSecuritiesByTicker,
  addTradeByTicker,
  fetchSecuritiesByTradeID,
  updateTradeByTradeID,
  deleteTradeByTradeID,
  fetchAllTrades,
}
