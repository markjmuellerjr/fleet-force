// app/api/serviceOrders/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import connectToDatabase from '../../../lib/mongodb';
import ServiceOrder from '../../../models/ServiceOrder';
import { IServiceOrder } from '../../../types/serviceOrder';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();

  try {
    const { role, email } = session.user;
    const dealerId = (session.user as { dealerId?: string }).dealerId;

    let filter: Record<string, unknown> = {};
    if (role === 'Client') {
      filter = { clientId: email };
    } else if (role === 'ServiceManager' || role === 'Admin') {
      filter = { dealerId };
    } else if (role === 'Technician') {
      // Assuming technician has assigned service orders
      filter = { dealerId };
    }

    const orders: IServiceOrder[] = await ServiceOrder.find(filter).sort({ appointmentDate: -1 }).lean();

    return NextResponse.json(orders);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();

  try {
    const { machineryBrand, machineryModel, appointmentDate } = await req.json();

    // Basic validation
    if (!machineryBrand || !machineryModel || !appointmentDate) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newOrder: IServiceOrder = await ServiceOrder.create({
      clientId: session.user.email,
      dealerId: (session.user as { dealerId?: string }).dealerId,
      machineryBrand,
      machineryModel,
      appointmentDate: new Date(appointmentDate),
      status: 'Scheduled',
      paymentStatus: 'Pending',
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}