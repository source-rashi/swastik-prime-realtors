const { validationResult } = require('express-validator');

/**
 * Middleware: runs after express-validator checks.
 * Returns 400 with all validation errors if any field fails.
 */
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

module.exports = { handleValidation };
