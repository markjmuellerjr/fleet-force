// models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'Client' | 'ServiceManager' | 'Technician' | 'Admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  image?: string;
  role: UserRole;
  company: mongoose.Types.ObjectId; // Reference to Company
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Required for Credentials Provider
    image: { type: String },
    role: {
      type: String,
      enum: ['Client', 'ServiceManager', 'Technician', 'Admin'],
      default: 'Client',
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  },
  { timestamps: true }
);

// Prevent password from being returned in queries by default
UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);