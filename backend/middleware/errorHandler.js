const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(`[${req.method} ${req.path}]`, err.message);

  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong. Please try again.'
    : err.message;

  res.status(status).json({ success: false, error: message });
}

module.exports = errorHandler;
