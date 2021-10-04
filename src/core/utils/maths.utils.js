const { ErrorHandler } = require('./errors.utils')

const isGreaterThanEqualToZero = (value, property) => {
  if (value <= 0) throw new ErrorHandler(400, `${property} must be greater than zero`)
  return true
}
module.exports = { isGreaterThanEqualToZero }
