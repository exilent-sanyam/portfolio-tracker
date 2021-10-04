const errorMessages = {
  SERVER_ERROR: {
    message: 'Something Went Wrong',
    status: 500,
  },
}

class ErrorHandler extends Error {
  constructor(statusCode, errorMessage) {
    super()
    this.statusCode = statusCode
    this.errorMessage = errorMessage
  }
}

const handleError = (err, req, res) => {
  const { statusCode = errorMessages.SERVER_ERROR.status, errorMessage = errorMessages.SERVER_ERROR.message } = err

  res.status(statusCode).send({
    statusCode,
    errorMessage,
    path: req.path,
  })
}

module.exports = {
  ErrorHandler,
  handleError,
  errorMessages,
}
