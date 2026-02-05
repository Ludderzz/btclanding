import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { email } = req.body;

  // 1. Initialize Auth
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fixes Vercel newline issue
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

  try {
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // Uses the first sheet

    // 2. Append the row
    await sheet.addRow({
      Email: email,
      Date: new Date().toLocaleString(),
    });

    return res.status(200).json({ message: 'Added to Google Sheets!' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}