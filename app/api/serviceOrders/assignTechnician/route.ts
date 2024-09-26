// app/api/serviceOrders/assignTechnician/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import ServiceOrder from '../../../../models/ServiceOrder';
import User from '../../../../models/User';
import { getUserRole } from '../../../../lib/getUserRole';

export async function POST(req: NextRequest) {
  try {
    const role = await getUserRole(req);
    if (!['Admin', 'ServiceManager'].includes(role!)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { orderId, technicianEmail } = await req.json();

    // Validate input
    if (!orderId || !technicianEmail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find the technician
    const technician = await User.findOne({ email: technicianEmail, role: 'Technician' });
    if (!technician) {
      return NextResponse.json(
        { message: 'Technician not found' },
        { status: 404 }
      );
    }

    // Assign technician to service order
    const serviceOrder = await ServiceOrder.findById(orderId);
    if (!serviceOrder) {
      return NextResponse.json(
        { message: 'Service Order not found' },
        { status: 404 }
      );
    }

    serviceOrder.assignedTechnician = technician._id;
    serviceOrder.status = 'Assigned';

    await serviceOrder.save();

    return NextResponse.json(
      { message: 'Technician assigned successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Assign Technician Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}