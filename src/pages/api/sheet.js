import { getSession } from "next-auth/react";
import { google } from 'googleapis';

export default async (req, res) => {
    try {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ error: 'No Session Active' });
        }

        let accessToken = session.accessToken;
        const refreshToken = session.refreshToken;

        if (!accessToken) {
            return res.status(401).json({ error: 'No Access Token' });
        }

        const { sheetName, range } = req.query;
        const sheetId = req.query.sheetId || '1EB3B1epNgEMQ_jeeaHCbTkaN9MDk24sy3XD_VOkNLFg'; 

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken
        });

        if (oauth2Client.isTokenExpiring()) {
            const { tokens } = await oauth2Client.refreshAccessToken();
            accessToken = tokens.access_token; 
        }

        const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheetName}!${range}`
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('An error occurred: ', error);
        return res.status(500).json({ error: 'Internal Error' });
    }
};
