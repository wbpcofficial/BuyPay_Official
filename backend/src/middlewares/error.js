const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../utils/APIError');
const { env } = require('../config/vars');

/**
 * Error handler. Send stacktrace only during development
 */
const handler = (err, req, res, next) => {

  // add stacktrace to trace the source of error
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 */
exports.converter = (err, req, res, next) => {
  let convertedError = err;
  
  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status
    });
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
