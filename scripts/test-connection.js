// scripts/test-connection.ts

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fleetforce';

const testConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

testConnection();