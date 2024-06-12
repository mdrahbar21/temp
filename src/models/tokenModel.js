// models/tokenModel.js
import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  accessTokenExpiry: { type: Date, required: true },
  refreshTokenExpiry: { type: Date, required: true }
});

// Check if the model exists before creating it
const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);

export default Token;
