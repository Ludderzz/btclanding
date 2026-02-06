import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  // 1. Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // 2. Setup Auth
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    // 3. Find row (Case-Insensitive search to be safe)
    // We use .toRawElement() or simply row.get() depending on library version
    const rowToDelete = rows.find(row => {
      const rowEmail = row.get('Email');
      return rowEmail && rowEmail.toLowerCase() === email.toLowerCase();
    });

    if (rowToDelete) {
      console.log(`Deleting row for: ${email}`);
      await rowToDelete.delete(); 
      return res.status(200).json({ message: 'Successfully unsubscribed' });
    }
    
    console.log(`Unsubscribe attempt failed: ${email} not found in sheet.`);
    return res.status(404).json({ message: 'Email not found in our records.' });

  } catch (e) {
    console.error("Unsubscribe Error:", e.message);
    return res.status(500).json({ error: e.message });
  }
}