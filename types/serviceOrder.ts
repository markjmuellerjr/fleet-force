// types/serviceOrder.ts

export interface IServiceOrder {
    _id: string;
    clientId: string;
    dealerId: string;
    machineryBrand: string;
    machineryModel: string;
    appointmentDate: string; // ISO string
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
    invoiceId?: string;
    paymentStatus: 'Pending' | 'Paid';
    createdAt: string;
    updatedAt: string;
  }