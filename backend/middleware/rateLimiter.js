const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

/**
 * Rate limiter for leads endpoint
 * Max 10 lead submissions per IP per hour
 */
const leadsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please wait before submitting again.',
  },
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit hit — IP: ${req.ip}`);
    res.status(429).json(options.message);
  },
});

/**
 * Rate limiter for AI report endpoint
 * Max 20 reports per IP per hour
 */
const aiReportLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'AI report limit reached. Try again in an hour.',
  },
});

module.exports = { leadsLimiter, aiReportLimiter };
