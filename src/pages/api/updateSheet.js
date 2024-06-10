// pages/api/updateSheet.js
import { googleClient } from "../../utils/googleClient";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sheetId, range, value, accessToken } = req.body;
    try {
      const sheets = googleClient(accessToken);
      const response = sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[value]],
        },
      });
      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
