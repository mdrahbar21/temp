// utils/googleClient.js
import { google } from 'googleapis';
import { updateServerManagedTokens } from './tokenManager';

export const googleClient = (accessToken, refreshToken = '') => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  // Automatically refresh and set the access token if a refresh token is provided
  if (refreshToken) {
    auth.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        console.log('New refresh token:', tokens.refresh_token);
      }
      console.log('New access token:', tokens.access_token);
      updateServerManagedTokens(tokens).catch(console.error);
    });
  }

  return google.sheets({ version: 'v4', auth });
};
