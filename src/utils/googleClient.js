//utils/googleClient.js

import { google } from 'googleapis';

export const googleClient = (accessToken, refreshToken = '') => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken, // Optional: include refresh token if available
  });

  // Automatically refresh and set the access token if a refresh token is provided
  if (refreshToken) {
    auth.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        console.log('New refresh token:', tokens.refresh_token);
        // Save new refresh token here
      }
      console.log('New access token:', tokens.access_token);
      // Save new access token here
    });
  }

  return google.sheets({ version: 'v4', auth });
};