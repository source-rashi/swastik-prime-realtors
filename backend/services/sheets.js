/**
 * Google Sheets Service
 * Appends lead data to the configured spreadsheet.
 *
 * SETUP GUIDE:
 * 1. Go to console.cloud.google.com
 * 2. Create a new project → Enable "Google Sheets API"
 * 3. IAM → Service Accounts → Create service account
 * 4. Keys → Add Key → JSON → download the file
 * 5. Copy "client_email" to GOOGLE_SERVICE_ACCOUNT_EMAIL in .env
 * 6. Copy "private_key" to GOOGLE_PRIVATE_KEY in .env
 * 7. Create a Google Sheet → Share it with the service account email (Editor)
 * 8. Copy the Sheet ID from the URL to GOOGLE_SHEET_ID in .env
 *    URL format: docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
 */
const { google } = require('googleapis');
const logger = require('../utils/logger');

// Sheet tab names
const SHEETS = {
  buyer: 'Buyer Leads',
  seller: 'Seller Leads',
};

// Column headers for each sheet tab
const HEADERS = {
  buyer: ['Timestamp', 'Lead Type', 'Name', 'Phone', 'Email', 'Property Type', 'Location', 'Budget', 'Purpose', 'Message', 'Status'],
  seller: ['Timestamp', 'Lead Type', 'Name', 'Phone', 'Email', 'Property Type', 'Location', 'Size', 'Expected Price', 'Message', 'Status'],
};

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

async function getSheetsClient() {
  const auth = getAuth();
  return google.sheets({ version: 'v4', auth });
}

/**
 * Ensures a sheet tab exists; creates it with headers if not.
 */
async function ensureSheetExists(sheets, spreadsheetId, tabName, headers) {
  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const exists = meta.data.sheets.some(s => s.properties.title === tabName);

    if (!exists) {
      // Create the sheet tab
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: tabName } } }],
        },
      });
      // Write headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${tabName}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [headers] },
      });
      logger.info(`Created sheet tab: ${tabName}`);
    }
  } catch (err) {
    logger.error('ensureSheetExists failed:', err.message);
    throw err;
  }
}

/**
 * Appends a lead row to the appropriate sheet tab.
 * @param {string} type - 'buyer' or 'seller'
 * @param {Array} rowData - Array of cell values
 */
async function appendLead(type, rowData) {
  if (!process.env.GOOGLE_SHEET_ID) {
    logger.warn('GOOGLE_SHEET_ID not set — skipping Sheets save');
    return { skipped: true, reason: 'no sheet id' };
  }

  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const tabName = SHEETS[type] || SHEETS.buyer;
    const headers = HEADERS[type] || HEADERS.buyer;

    await ensureSheetExists(sheets, spreadsheetId, tabName, headers);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:K`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [rowData] },
    });

    logger.success(`Lead saved to Sheets — ${tabName}, row updated`);
    return { success: true, updatedRange: response.data.updates?.updatedRange };
  } catch (err) {
    logger.error('Google Sheets append failed:', err.message);
    // Don't throw — other notifications should still run
    return { success: false, error: err.message };
  }
}

module.exports = { appendLead };
