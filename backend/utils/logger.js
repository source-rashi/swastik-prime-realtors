/**
 * Simple console logger with timestamps and color codes
 */
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  grey: '\x1b[90m',
};

function timestamp() {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

const logger = {
  info: (msg, data = '') => {
    console.log(`${colors.cyan}[${timestamp()}] INFO${colors.reset}  ${msg}`, data || '');
  },
  success: (msg, data = '') => {
    console.log(`${colors.green}[${timestamp()}] OK${colors.reset}    ${msg}`, data || '');
  },
  warn: (msg, data = '') => {
    console.warn(`${colors.yellow}[${timestamp()}] WARN${colors.reset}  ${msg}`, data || '');
  },
  error: (msg, err = '') => {
    console.error(`${colors.red}[${timestamp()}] ERROR${colors.reset} ${msg}`, err || '');
  },
  debug: (msg, data = '') => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.grey}[${timestamp()}] DEBUG ${msg}${colors.reset}`, data || '');
    }
  },
};

module.exports = logger;
