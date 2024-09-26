import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceOrder extends Document {
  clientId: string;
  dealerId: string;
  machineryBrand: string;
  machineryModel: string;
  appointmentDate: Date;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  invoiceId?: string;
  paymentStatus: 'Pending' | 'Paid';
}

const ServiceOrderSchema: Schema = new Schema({
  clientId: { type: String, required: true },
  dealerId: { type: String, required: true },
  machineryBrand: { type: String, required: true },
  machineryModel: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  status: { type: String, enum: ['Scheduled', 'In Progress', 'On Hold', 'Completed', 'Cancelled'], default: 'Scheduled' },
  invoiceId: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.models.ServiceOrder || mongoose.model<IServiceOrder>('ServiceOrder', ServiceOrderSchema);