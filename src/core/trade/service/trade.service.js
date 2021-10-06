const {
  validateAddTradeRequest,
  validateUpdateTradeRequest,
  validateDeleteTradeRequest,
} = require('./trade.validation')
const {
  fetchSecuritiesByTicker,
  addTradeByTicker,
  fetchSecuritiesByTradeID,
  updateTradeByTradeID,
  deleteTradeByTradeID,
  fetchAllTrades,
} = require('../repository/trade.repository')
const { ErrorHandler } = require('../../utils/errors.utils')

const addTrade = async reqBody => {
  const { ticker, type, quantity, price } = validateAddTradeRequest(reqBody)
  const securities = await fetchSecuritiesByTicker(ticker)
  return await addTradeByTicker(
    { ticker, type, quantity, price },
    getShareCount(securities?.noOfShares ?? 0, type, quantity),
  )
}

const updateTrade = async reqBody => {
  const { tradeID, type, quantity, price } = validateUpdateTradeRequest(reqBody)
  const { security, noOfShares } = await fetchSecuritiesByTradeID(tradeID)
  const updatedCount = getUpdatedCountForShare(security, noOfShares, type, quantity)
  return await updateTradeByTradeID(tradeID, type, quantity, price, updatedCount)
}

const getShareCount = (currentShares, type, quantity) => {
  if (type === 'SELL') {
    if (currentShares < quantity) {
      throw new ErrorHandler(400, 'Trying to SELL more Shares than available')
    }
    currentShares -= quantity
  } else {
    currentShares += quantity
  }

  return currentShares
}

const getUpdatedCountForShare = (security, noOfShares, type, quantity) => {
  const oldType = security.type
  const oldQuantity = security.quantity
  if (!oldQuantity) {
    return
  }

  if (oldType === 'SELL') {
    if (type === 'SELL') {
      noOfShares = noOfShares + oldQuantity - quantity
    } else {
      noOfShares = noOfShares + oldQuantity + quantity
    }
  } else {
    if (type === 'SELL') {
      noOfShares = noOfShares - quantity - oldQuantity
    } else {
      noOfShares = noOfShares + quantity - oldQuantity
    }
  }

  if (noOfShares < 0) {
    throw new ErrorHandler(400, 'This update will make total number of shares less than zero!')
  }

  return noOfShares
}

const deleteTrade = async reqBody => {
  const { tradeID } = validateDeleteTradeRequest(reqBody)
  const { security, noOfShares } = await fetchSecuritiesByTradeID(tradeID)
  const updatedCount = getSecurityDetailForDeleteTrade(security, noOfShares)
  return await deleteTradeByTradeID(tradeID, updatedCount)
}

const getSecurityDetailForDeleteTrade = (security, noOfShares) => {
  const { type, quantity } = security
  if (!quantity) {
    return
  }

  if (type === 'BUY') {
    noOfShares -= quantity
  } else {
    noOfShares += quantity
  }

  if (noOfShares < 0) {
    throw new ErrorHandler(400, 'This Delete will make total number of shares less than zero')
  }

  return noOfShares
}
/**
 * This will return a map something like described below:
 *  "ticker":{
 *    trades: expect.any(Array),
 *    noOfShares: expect.any(Number)
 *  },
 */
const fetchTrades = async () => {
  const response = await fetchAllTrades()
  if (response) {
    return response.reduce((acc, value) => {
      acc[value._id] = { trades: value.trades, noOfShares: value.noOfShares }
      return acc
    }, {})
  }
  return {}
}

module.exports = {
  addTrade,
  updateTrade,
  deleteTrade,
  fetchTrades,
}
