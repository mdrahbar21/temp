// pages/api/sheets.js
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
    const {range, spreadsheetId}=req.body;
  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const accessToken=process.env.accessToken
  // if (!token) {
  //   return res.status(401).json({
  //     error: {
  //       name: 'Unauthorized',
  //       message: 'Unauthorized'
  //     },
  //   },
  //   );
  // }
  // const accessToken = token?.accessToken;
  console.log('get data access token: ', accessToken);

  if (!accessToken) {
    return res.status(403).json({ error: 'Access Token Missing' });
  }

  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Authorization: `Bearer ya29.a0AXooCguUm5RALvswk5S4Lt1SbMq-FI-7ToX8oNY8MBP6MKaPJZwoik83DXodfspqqlCgt5aYGUvYmU04pI4ehHVIgq0kKzT7fj1CF82qD_6t6ko-4ISn4n6tzJGEYGpwqeJyW1gswYRMrHYv8LzYkD6W771EZ_ZEeg-JaCgYKAYoSARASFQHGX2MiweL0rEJJJOZKKV-XZYNkhw0171`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
