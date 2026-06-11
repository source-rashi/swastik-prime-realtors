const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'Swastik Prime API',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
