//utils/googleClient.js

import { google } from 'googleapis';

export const googleClient = (authToken) => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: authToken });
  return google.sheets({ version: 'v4', auth });
};
