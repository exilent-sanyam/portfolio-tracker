const { ErrorHandler } = require('../../utils/errors.utils')
const { isGreaterThanEqualToZero } = require('../../utils/maths.utils')

const validateAddTradeRequest = ({ ticker, type, quantity, price }) => {
  isAvailable(ticker, 'ticker') &&
    isAvailable(type, 'type') &&
    isAvailable(quantity, 'quantity') &&
    isAvailable(price, 'price')

  isValidType(price, 'number', 'price') && isValidType(quantity, 'number', 'quantity')

  if (!validType[type]) {
    throw new ErrorHandler(400, 'type can be either SELL or BUY')
  }

  isGreaterThanEqualToZero(price, 'price') && isGreaterThanEqualToZero(quantity, 'quantity')

  return { ticker, type, quantity, price }
}

const validateUpdateTradeRequest = ({ tradeID, type, quantity, price }) => {
  isAvailable(tradeID, 'tradeID') &&
    isAvailable(type, 'type') &&
    isAvailable(quantity, 'quantity') &&
    isAvailable(price, 'price')

  isValidType(price, 'number', 'price') && isValidType(quantity, 'number', 'quantity')

  if (!validType[type]) {
    throw new ErrorHandler(400, 'type can be either SELL or BUY')
  }

  isGreaterThanEqualToZero(price, 'price') && isGreaterThanEqualToZero(quantity, 'quantity')

  return { tradeID, type, quantity, price }
}

const validateDeleteTradeRequest = ({ tradeID }) => {
  isAvailable(tradeID, 'tradeID')

  return { tradeID }
}

const validType = {
  SELL: 'SELL',
  BUY: 'BUY',
}

const isAvailable = (key, name) => {
  if (key === undefined) {
    throw new ErrorHandler(400, `${name} not available`)
  }
  return true
}

const isValidType = (key, type, name) => {
  if (typeof key !== type) {
    throw new ErrorHandler(400, `${name} is not of type ${type}`)
  }
  return true
}

module.exports = {
  validateAddTradeRequest,
  validateUpdateTradeRequest,
  validateDeleteTradeRequest,
}
