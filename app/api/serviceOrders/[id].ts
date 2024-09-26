// pages/api/serviceOrders/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../utils/db';
import ServiceOrder from '../../../models/ServiceOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  // Authenticate the user
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Connect to the database
  await connectToDatabase();

  // Find the service order by ID
  const order = await ServiceOrder.findById(id);

  if (!order) {
    return res.status(404).json({ message: 'Service Order not found' });
  }

  // Authorization based on role
  const { role, dealerId, email } = session.user;
  if (role === 'Client' && order.clientId !== email) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  if ((role === 'ServiceManager' || role === 'Admin') && order.dealerId !== dealerId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (method === 'GET') {
    // Return the service order
    res.status(200).json(order);
  } else if (method === 'PUT') {
    // Update the service order
    const updates = req.body;
    Object.assign(order, updates);
    await order.save();
    res.status(200).json(order);
  } else if (method === 'DELETE') {
    // Delete the service order
    await order.remove();
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}