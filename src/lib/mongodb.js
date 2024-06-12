// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/sheet';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
    try {
      await mongoose.connect(`mongodb://127.0.0.1:27017/sheet`);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed");
      console.error(error);
    }
  };

export default dbConnect;
