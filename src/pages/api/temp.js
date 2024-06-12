// pages/api/temp.js
import dbConnect from "../../lib/mongodb";
import { googleClient } from "../../utils/googleClient";
import { getServerManagedTokens, updateServerManagedTokens } from "../../utils/tokenManager";

export default async function handler(req, res) {
    await dbConnect();  // Ensure MongoDB connection

    const { range, spreadsheetId } = req.body;

    try {
        const { accessToken, refreshToken } = await getServerManagedTokens();
        if (!accessToken) {
            return res.status(403).json({ error: 'Access Token Missing' });
        }

        const sheets = googleClient(accessToken, refreshToken);
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
