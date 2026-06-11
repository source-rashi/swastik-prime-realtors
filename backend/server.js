/**
 * SWASTIK PRIME REALTORS — Backend API Server
 * Express + CORS + Helmet + Morgan logging
 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

// ── SECURITY MIDDLEWARE ────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ── CORS ──────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://swastik-prime-realtors.vercel.app', // update when deployed
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── BODY PARSING ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── REQUEST LOGGING ───────────────────────────────────────────
app.use(morgan('dev'));

// ── ROUTES ────────────────────────────────────────────────────
app.use('/api/health',    require('./routes/health'));
app.use('/api/leads',     require('./routes/leads'));
app.use('/api/ai-report', require('./routes/ai-report'));

// ── ROOT ──────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: 'Swastik Prime Realtors API',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET  /api/health',
      'POST /api/leads',
      'POST /api/ai-report',
    ],
  });
});

// ── 404 HANDLER ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.path} not found` });
});

// ── GLOBAL ERROR HANDLER ──────────────────────────────────────
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// ── START ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  logger.success(`Swastik Prime API running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

module.exports = app;
