const { format } = require('date-fns');

/**
 * Format a lead object for Google Sheets row
 */
function formatLeadForSheets(lead) {
  return [
    format(new Date(), 'dd/MM/yyyy HH:mm'),  // Timestamp
    lead.type || 'unknown',                    // Lead type: buyer/seller
    lead.name || '',
    lead.phone || '',
    lead.email || '',
    lead.propertyType || '',
    lead.location || '',
    lead.budget || lead.size || '',
    lead.purpose || lead.expectedPrice || '',
    lead.message || '',
    'New',                                     // Status column
  ];
}

/**
 * Format a lead for email notification
 */
function formatLeadForEmail(lead) {
  const type = lead.type === 'seller' ? '🏠 SELLER LEAD' : '🔍 BUYER LEAD';
  return {
    subject: `[Swastik Prime] New ${type} — ${lead.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:8px">
        <div style="background:#0F1C2E;padding:20px;border-radius:6px;margin-bottom:20px">
          <h2 style="color:#D4A843;margin:0;font-size:20px">Swastik Prime Realtors</h2>
          <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px">New Lead Notification</p>
        </div>
        <div style="background:white;padding:20px;border-radius:6px;border-left:4px solid #D4A843">
          <h3 style="color:#0F1C2E;margin:0 0 16px">${type}</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#666;width:140px"><strong>Name</strong></td><td style="padding:8px 0;color:#333">${lead.name || '—'}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#666"><strong>Phone</strong></td><td style="padding:8px 4px;color:#333">${lead.phone || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#666"><strong>Email</strong></td><td style="padding:8px 0;color:#333">${lead.email || '—'}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#666"><strong>Property Type</strong></td><td style="padding:8px 4px;color:#333">${lead.propertyType || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#666"><strong>Location</strong></td><td style="padding:8px 0;color:#333">${lead.location || '—'}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#666"><strong>Budget / Size</strong></td><td style="padding:8px 4px;color:#333">${lead.budget || lead.size || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#666"><strong>Purpose / Price</strong></td><td style="padding:8px 0;color:#333">${lead.purpose || lead.expectedPrice || '—'}</td></tr>
            ${lead.message ? `<tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#666"><strong>Message</strong></td><td style="padding:8px 4px;color:#333">${lead.message}</td></tr>` : ''}
          </table>
        </div>
        <p style="font-size:12px;color:#999;margin-top:16px;text-align:center">
          Received ${format(new Date(), 'dd MMM yyyy, hh:mm a')} · Swastik Prime CRM
        </p>
      </div>
    `,
  };
}

/**
 * Format WhatsApp message for new lead
 */
function formatLeadForWhatsApp(lead) {
  const emoji = lead.type === 'seller' ? '🏠' : '🔍';
  return `${emoji} *New ${lead.type === 'seller' ? 'Seller' : 'Buyer'} Lead — Swastik Prime*

👤 *Name:* ${lead.name || '—'}
📞 *Phone:* ${lead.phone || '—'}
📧 *Email:* ${lead.email || '—'}
🏢 *Type:* ${lead.propertyType || '—'}
📍 *Location:* ${lead.location || '—'}
💰 *${lead.type === 'seller' ? 'Expected Price' : 'Budget'}:* ${lead.expectedPrice || lead.budget || '—'}
📝 *Purpose:* ${lead.purpose || '—'}

_Received at ${format(new Date(), 'dd MMM, hh:mm a')}_`;
}

module.exports = { formatLeadForSheets, formatLeadForEmail, formatLeadForWhatsApp };
