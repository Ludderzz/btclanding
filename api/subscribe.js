import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { email, type, phone } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

  try {
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; 

    // MERGED: One call to rule them all. 
    // This adds one row with all 4 columns filled out.
    await sheet.addRow({
      Email: email.trim(),
      Date: new Date().toLocaleString('en-GB'), // Clean UK format
      Type: type || 'customer',
      Phone: phone || 'N/A'
    });

    return res.status(200).json({ message: 'Added to Google Sheets!' });
  } catch (e) {
    console.error("Server Error:", e.message);
    return res.status(500).json({ error: e.message });
  }
}