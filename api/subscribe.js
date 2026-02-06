import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  // Destructure 'type' from the request body sent by Landing.jsx
  const { email, type } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // 1. Initialize Auth
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

  try {
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; 

    // 2. Append the row with the 'Type' column
    // IMPORTANT: Make sure your Google Sheet has a header named "Type" in the first row
    await sheet.addRow({
      Email: email,
      Date: new Date().toLocaleString(),
      Type: type || 'customer' // Defaults to customer if for some reason type is missing
    });

    return res.status(200).json({ message: 'Added to Google Sheets!' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}