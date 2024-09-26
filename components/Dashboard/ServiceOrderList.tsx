// components/Dashboard/ServiceOrderList.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServiceOrders,
  selectServiceOrders,
  selectServiceOrdersLoading,
  selectServiceOrdersError,
} from '../../redux/slices/serviceOrderSlice';
import { motion } from 'framer-motion';

const ServiceOrderList: React.FC = () => {
  const dispatch = useDispatch();
  const serviceOrders = useSelector(selectServiceOrders);
  const loading = useSelector(selectServiceOrdersLoading);
  const error = useSelector(selectServiceOrdersError);

  useEffect(() => {
    dispatch(fetchServiceOrders() as any);
  }, [dispatch]);

  if (loading) {
    return <div className="glass p-6 rounded-lg shadow-lg">Loading service orders...</div>;
  }

  if (error) {
    return <div className="glass p-6 rounded-lg shadow-lg text-red-500">Error: {error}</div>;
  }

  return (
    <div className="glass p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Your Service Orders</h3>
      {serviceOrders.length === 0 ? (
        <p className="text-gray-400">No service orders found.</p>
      ) : (
        <ul>
          {serviceOrders.map(order => (
            <motion.li
              key={order._id}
              className="mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600 transition"
              whileHover={{ scale: 1.02 }}
            >
              <p>Brand: {order.machineryBrand}</p>
              <p>Model: {order.machineryModel}</p>
              <p>Date: {new Date(order.appointmentDate).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceOrderList;