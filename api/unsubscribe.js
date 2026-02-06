import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'No email provided' });

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    // Find the row where Column A (Email) matches
    const rowToDelete = rows.find(row => {
      const cellValue = row._rawData[0] || ''; 
      return cellValue.trim().toLowerCase() === email.trim().toLowerCase();
    });

    if (rowToDelete) {
      await rowToDelete.delete();
      return res.status(200).json({ message: 'Removed' });
    }
    
    // If we reach here, no match was found
    return res.status(404).json({ message: 'Email not found' });
  } catch (e) {
    console.error("Unsubscribe API Error:", e.message);
    return res.status(500).json({ error: e.message });
  }
}