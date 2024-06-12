// pages/api/appendSheet.js
import { getToken } from "next-auth/jwt";
import fetch from 'node-fetch';
import { Redis } from '@upstash/redis';


export async function POST(req) {
    console.log('Received request:', req.body, req.method);
    const { orderId, issueDescription, issueType } = req.body;
    if (!orderId || !issueDescription || !issueType) {
        console.log('Missing required fields');
        return new Response(JSON.stringify({success: false, message: `Missing Required Fields`}),  {status: 403});
    }
    const range='A:D';
    const values = [[orderId.toString(),issueType.toString(),issueDescription.toString()]];
    const spreadsheetId='1t4cdNfUxSB_S6ZfpwIkxLQoDIw52tUKlc0Obt5XNjrk';
    const valueInputOption = 'RAW';

    // if (req.method !== 'POST') { 
    //     console.log('Method not allowed');
    //     return res.status(405).json({ error: 'Method not allowed' });
    // }

    const redis = new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
    });

    // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // const accessToken=process.env.accessToken;
    const accessToken = await redis.get(`accessToken-rahbar@hoomanlabs.com`);

    // if (!token) {
    //     console.log('Unauthorized request');
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }

    // const accessToken = token.accessToken;
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
