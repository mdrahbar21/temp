// utils/tokenManager.js
import Token from '../models/tokenModel'; 

export async function getServerManagedTokens() {
  // Fetch the token document from the database
  const tokenDoc = await Token.findOne();
  if (!tokenDoc) {
    throw new Error('No tokens found in database');
  }
  return {
    accessToken: tokenDoc.accessToken,
    refreshToken: tokenDoc.refreshToken,
    accessTokenExpiry: tokenDoc.accessTokenExpiry,
    refreshTokenExpiry: tokenDoc.refreshTokenExpiry
  };
}

export async function updateServerManagedTokens(credentials) {
  const updates = {
    accessToken: credentials.access_token,
    refreshToken: credentials.refresh_token,
    accessTokenExpiry: new Date(Date.now() + credentials.expiry_date),
    refreshTokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) // Assuming 1 year for refresh token expiry
  };
  // Update or create the token document
  await Token.updateOne({}, updates, { upsert: true });
}
