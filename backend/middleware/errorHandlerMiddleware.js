import createHttpError from 'http-errors'

const notFoundMiddleware = (req, res, next) => {
  next(createHttpError(404, `Not Found - ${req.originalUrl}`))
}

const errorHandlerMiddleware = (error, req, res, next) => {
  console.error(error)
  let errorMessage = error.message || 'An unknown error occurred'
  let statusCode = error.statusCode || 500
  if (createHttpError.isHttpError(error)) {
    errorMessage = error.message
    statusCode = error.status
  }
  res.status(statusCode).json({ message: errorMessage || error })
}

export { notFoundMiddleware, errorHandlerMiddleware }
