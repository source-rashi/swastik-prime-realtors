/**
 * WhatsApp Notification Service — Twilio
 *
 * SETUP GUIDE:
 * 1. Sign up at twilio.com (free trial gives $15 credit)
 * 2. Go to Messaging → Try WhatsApp
 * 3. Note your sandbox number (usually +14155238886)
 * 4. Send the join code from your WhatsApp to activate sandbox
 * 5. Get Account SID + Auth Token from twilio.com/console
 * 6. Fill TWILIO_* values in .env
 */
const twilio = require('twilio');
const logger = require('../utils/logger');

let client = null;

function getClient() {
  if (client) return client;

  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    logger.warn('Twilio credentials not set — WhatsApp notifications disabled');
    return null;
  }

  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return client;
}

/**
 * Send WhatsApp message to admin
 * @param {string} messageBody - Formatted WhatsApp message text
 */
async function notifyAdmin(messageBody) {
  const c = getClient();
  if (!c) return { skipped: true, reason: 'no twilio config' };

  const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
  const to = process.env.ADMIN_WHATSAPP;

  if (!to) {
    logger.warn('ADMIN_WHATSAPP not set — WhatsApp notification skipped');
    return { skipped: true, reason: 'no admin number' };
  }

  try {
    const message = await c.messages.create({ from, to, body: messageBody });
    logger.success(`WhatsApp sent — SID: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (err) {
    logger.error('WhatsApp send failed:', err.message);
    // Don't throw — non-critical
    return { success: false, error: err.message };
  }
}

module.exports = { notifyAdmin };
