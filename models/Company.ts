// models/Company.ts

import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICompany extends Document {
  _id: Types.ObjectId; // Explicitly define _id
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema<ICompany>(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent password from being returned in queries by default (if applicable)
CompanySchema.set('toJSON', {
  transform: function (doc, ret, options) {
    return ret;
  },
});

export default mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);