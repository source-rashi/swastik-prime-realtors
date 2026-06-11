/**
 * Leads Routes
 * POST /api/leads/buyer  — buyer enquiry (AI report request)
 * POST /api/leads/seller — seller/landlord property listing
 */
const router = require('express').Router();
const { body } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const { handleValidation } = require('../middleware/validate');
const { leadsLimiter } = require('../middleware/rateLimiter');
const { appendLead } = require('../services/sheets');
const { sendAdminNotification, sendLeadConfirmation } = require('../services/email');
const { notifyAdmin } = require('../services/whatsapp');
const { formatLeadForSheets, formatLeadForEmail, formatLeadForWhatsApp } = require('../utils/formatters');
const logger = require('../utils/logger');

// ── BUYER LEAD ─────────────────────────────────────────────────────
router.post(
  '/buyer',
  leadsLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('phone').trim().notEmpty().withMessage('Phone is required').matches(/^[+\d\s\-()]{7,20}$/),
    body('email').optional().isEmail().normalizeEmail(),
    body('propertyType').trim().notEmpty().withMessage('Property type is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('budget').trim().notEmpty().withMessage('Budget is required'),
    body('purpose').trim().isIn(['self-use', 'investment', 'Self-Use', 'Investment', '']).optional(),
    body('message').optional().trim().isLength({ max: 1000 }),
  ],
  handleValidation,
  async (req, res) => {
    const leadId = uuidv4().substring(0, 8).toUpperCase();
    const lead = { ...req.body, type: 'buyer', leadId };

    logger.info(`New buyer lead — ID: ${leadId}, Name: ${lead.name}`);

    // Run all integrations in parallel — don't block on any one
    const [sheetsResult, emailResult, waResult] = await Promise.allSettled([
      appendLead('buyer', formatLeadForSheets(lead)),
      sendAdminNotification(formatLeadForEmail(lead)),
      notifyAdmin(formatLeadForWhatsApp(lead)),
    ]);

    // Also send confirmation to lead (non-blocking)
    if (lead.email) {
      sendLeadConfirmation(lead.email, lead.name, 'buyer').catch(() => {});
    }

    logger.info(`Buyer lead ${leadId} processed — Sheets: ${sheetsResult.status}, Email: ${emailResult.status}, WA: ${waResult.status}`);

    res.status(201).json({
      success: true,
      leadId,
      message: 'Your enquiry has been received. Our team will contact you within 24 hours.',
      integrations: {
        sheets: sheetsResult.status === 'fulfilled' ? sheetsResult.value : { error: sheetsResult.reason },
        email: emailResult.status === 'fulfilled' ? emailResult.value : { error: emailResult.reason },
        whatsapp: waResult.status === 'fulfilled' ? waResult.value : { error: waResult.reason },
      },
    });
  }
);

// ── SELLER LEAD ────────────────────────────────────────────────────
router.post(
  '/seller',
  leadsLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('phone').trim().notEmpty().withMessage('Phone is required').matches(/^[+\d\s\-()]{7,20}$/),
    body('email').optional().isEmail().normalizeEmail(),
    body('propertyType').trim().notEmpty().withMessage('Property type is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('size').trim().notEmpty().withMessage('Size is required'),
    body('expectedPrice').trim().notEmpty().withMessage('Expected price is required'),
    body('message').optional().trim().isLength({ max: 1000 }),
  ],
  handleValidation,
  async (req, res) => {
    const leadId = uuidv4().substring(0, 8).toUpperCase();
    const lead = { ...req.body, type: 'seller', leadId };

    logger.info(`New seller lead — ID: ${leadId}, Name: ${lead.name}`);

    const [sheetsResult, emailResult, waResult] = await Promise.allSettled([
      appendLead('seller', formatLeadForSheets(lead)),
      sendAdminNotification(formatLeadForEmail(lead)),
      notifyAdmin(formatLeadForWhatsApp(lead)),
    ]);

    if (lead.email) {
      sendLeadConfirmation(lead.email, lead.name, 'seller').catch(() => {});
    }

    logger.info(`Seller lead ${leadId} processed — Sheets: ${sheetsResult.status}, Email: ${emailResult.status}, WA: ${waResult.status}`);

    res.status(201).json({
      success: true,
      leadId,
      message: 'Your property listing request has been received. Our team will contact you within 24 hours.',
      integrations: {
        sheets: sheetsResult.status === 'fulfilled' ? sheetsResult.value : { error: sheetsResult.reason },
        email: emailResult.status === 'fulfilled' ? emailResult.value : { error: emailResult.reason },
        whatsapp: waResult.status === 'fulfilled' ? waResult.value : { error: waResult.reason },
      },
    });
  }
);

module.exports = router;
