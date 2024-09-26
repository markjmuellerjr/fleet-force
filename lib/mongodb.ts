// lib/mongodb.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null } = (global as { mongoose?: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null } }).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = (global as { mongoose?: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null } }).mongoose = { conn: null, promise: null };
}
async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;