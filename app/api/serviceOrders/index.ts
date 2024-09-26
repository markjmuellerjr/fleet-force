// pages/api/serviceOrders/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../utils/db';
import ServiceOrder from '../../../models/ServiceOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Authenticate the user
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Connect to the database
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const { role, dealerId, email } = session.user;

      let filter = {};
      if (role === 'Client') {
        filter = { clientId: email };
      } else if (role === 'ServiceManager' || role === 'Admin') {
        filter = { dealerId };
      } else if (role === 'Technician') {
        // Assuming technician has assigned service orders
        filter = { dealerId };
      }

      const orders = await ServiceOrder.find(filter).sort({ appointmentDate: -1 });
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    // Create a new service order
    try {
      const { machineryBrand, machineryModel, appointmentDate } = req.body;

      // Basic validation
      if (!machineryBrand || !machineryModel || !appointmentDate) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newOrder = new ServiceOrder({
        clientId: session.user.email,
        dealerId: session.user.dealerId,
        machineryBrand,
        machineryModel,
        appointmentDate: new Date(appointmentDate),
        status: 'Scheduled',
        paymentStatus: 'Pending',
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}