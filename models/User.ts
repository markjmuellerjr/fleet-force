// models/User.ts

import * as mongoose from 'mongoose';
import { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the possible user roles
export type UserRole = 'Client' | 'ServiceManager' | 'Technician' | 'Admin';

// Define the User interface extending Mongoose's Document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  image?: string;
  role: UserRole;
  company: Types.ObjectId; // Reference to Company
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  trialEndsAt?: Date;
  subscriptionStatus?: 'active' | 'trialing' | 'canceled' | 'past_due';
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: { type: String }, // Required for Credentials Provider
    image: { type: String },
    role: {
      type: String,
      enum: ['Client', 'ServiceManager', 'Technician', 'Admin'],
      default: 'Client',
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    stripeCustomerId: { type: String, index: true },
    stripeSubscriptionId: { type: String, index: true },
    trialEndsAt: { type: Date },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'trialing', 'canceled', 'past_due'],
      default: 'trialing',
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash passwords
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Prevent password from being returned in queries by default
UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

// Example virtual field
UserSchema.virtual('isSubscriptionActive').get(function () {
  return this.subscriptionStatus === 'active' || this.subscriptionStatus === 'trialing';
});

// Prevent model recompilation errors in development
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);