const mongoose = require('mongoose');

/**
 * Custom error class for API errors
 */
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle Mongoose validation errors
 * @param {Error} err - Mongoose error object
 * @returns {Object} Formatted error object
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(error => error.message);
  return new APIError(`Invalid input data: ${errors.join('. ')}`, 400);
};

/**
 * Handle Mongoose duplicate key errors
 * @param {Error} err - Mongoose error object
 * @returns {Object} Formatted error object
 */
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new APIError(`Duplicate field value: ${field} = ${value}. Please use another value.`, 400);
};

/**
 * Handle Mongoose cast errors
 * @param {Error} err - Mongoose error object
 * @returns {Object} Formatted error object
 */
const handleCastError = (err) => {
  return new APIError(`Invalid ${err.path}: ${err.value}`, 400);
};

/**
 * Handle JWT errors
 * @param {Error} err - JWT error object
 * @returns {Object} Formatted error object
 */
const handleJWTError = () => {
  return new APIError('Invalid token. Please log in again.', 401);
};

/**
 * Handle JWT expired error
 * @returns {Object} Formatted error object
 */
const handleJWTExpiredError = () => {
  return new APIError('Your token has expired. Please log in again.', 401);
};

/**
 * Send error response in development environment
 * @param {Error} err - Error object
 * @param {Object} res - Response object
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

/**
 * Send error response in production environment
 * @param {Error} err - Error object
 * @param {Object} res - Response object
 */
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message
    });
  } 
  // Programming or other unknown error: don't leak error details
  else {
    // Log error for debugging
    console.error('ERROR 💥:', err);

    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

/**
 * Global error handling middleware
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle different types of errors
    if (err instanceof mongoose.Error.ValidationError) {
      error = handleValidationError(err);
    }
    if (err.code === 11000) {
      error = handleDuplicateKeyError(err);
    }
    if (err instanceof mongoose.Error.CastError) {
      error = handleCastError(err);
    }
    if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (err.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, res);
  }
};

// Export the APIError class for use in controllers
module.exports.APIError = APIError;
