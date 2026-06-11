/**
 * Email Notification Service — Nodemailer + Gmail SMTP
 *
 * SETUP GUIDE:
 * 1. Enable 2-Step Verification on your Gmail account
 * 2. Go to myaccount.google.com/apppasswords
 * 3. Generate an App Password for "Mail"
 * 4. Put it in SMTP_PASS in your .env
 */
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    logger.warn('SMTP credentials not set — email notifications disabled');
    return null;
  }

  transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  return transporter;
}

/**
 * Send admin notification email for new lead
 * @param {object} emailData - { subject, html }
 */
async function sendAdminNotification(emailData) {
  const transport = getTransporter();
  if (!transport) {
    logger.warn('Email skipped — no SMTP config');
    return { skipped: true };
  }

  try {
    const info = await transport.sendMail({
      from: `"Swastik Prime CRM" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: emailData.subject,
      html: emailData.html,
    });

    logger.success(`Email sent — messageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    logger.error('Email send failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Send confirmation email to the lead (buyer/seller)
 */
async function sendLeadConfirmation(toEmail, toName, leadType) {
  const transport = getTransporter();
  if (!transport || !toEmail) return { skipped: true };

  const subject = leadType === 'seller'
    ? 'Your property listing is received — Swastik Prime'
    : 'Your AI property report request — Swastik Prime';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
      <div style="background:#0F1C2E;padding:24px;text-align:center">
        <h2 style="color:#D4A843;margin:0">Swastik Prime Realtors</h2>
        <p style="color:rgba(255,255,255,.6);font-size:13px;margin:6px 0 0">Central India's Trusted Property Advisor</p>
      </div>
      <div style="padding:28px;background:#f9f9f9">
        <h3 style="color:#0F1C2E">Hi ${toName || 'there'},</h3>
        <p style="color:#555;line-height:1.7">
          Thank you for reaching out to <strong>Swastik Prime Realtors</strong>. We have received your enquiry and our advisory team will contact you within <strong>24 hours</strong>.
        </p>
        ${leadType === 'seller' ? `
          <div style="background:#fff;border-left:4px solid #D4A843;padding:16px;margin:20px 0">
            <p style="margin:0;color:#555;font-size:14px">While you wait, <a href="#" style="color:#D4A843">download our Seller's Guide</a> — tips on how to sell faster in Central India.</p>
          </div>
        ` : ''}
        <p style="color:#555;line-height:1.7">
          You can also reach us directly on WhatsApp for faster support.
        </p>
        <a href="https://wa.me/91XXXXXXXXXX" style="display:inline-block;background:#25D366;color:white;padding:12px 24px;border-radius:4px;font-size:14px;text-decoration:none;margin-top:8px">Chat on WhatsApp</a>
      </div>
      <div style="padding:16px;text-align:center;background:#e9e9e9">
        <p style="font-size:12px;color:#999;margin:0">© 2025 Swastik Prime Realtors · Indore, MP</p>
      </div>
    </div>
  `;

  try {
    await transport.sendMail({
      from: `"Swastik Prime Realtors" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject,
      html,
    });
    logger.success(`Confirmation email sent to ${toEmail}`);
    return { success: true };
  } catch (err) {
    logger.error('Confirmation email failed:', err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { sendAdminNotification, sendLeadConfirmation };
