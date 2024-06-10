// pages/api/appendSheet.js
import { getToken } from "next-auth/jwt";
import fetch from 'node-fetch';

export default async function handler(req, res) {
    console.log('Received request:', req.method, req.body);

    if (req.method !== 'POST') { 
        console.log('Method not allowed');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { range, spreadsheetId, values, valueInputOption = 'RAW' } = req.body;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        console.log('Unauthorized request');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const accessToken = token.accessToken;
    if (!accessToken) {
        console.log('Access Token Missing');
        return res.status(403).json({ error: 'Access Token Missing' });
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=${valueInputOption}`;
    console.log('URL:', url);
    console.log('Payload:', { range, values });

    const body = {
        range: range,
        majorDimension: "ROWS",
        values: values
    };

    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const text = await response.text();
        console.log('Response Text:', text);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = JSON.parse(text);
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to append data:', error);
        res.status(500).json({ error: 'Failed to append data' });
    }
}
