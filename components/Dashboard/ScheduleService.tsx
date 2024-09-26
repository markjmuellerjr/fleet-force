import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ScheduleService: React.FC = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/serviceOrders', {
        machineryBrand: brand,
        machineryModel: model,
        appointmentDate: date,
      });
      alert('Service Scheduled Successfully!');
      // Reset form
      setBrand('');
      setModel('');
      setDate('');
    } catch (error) {
      console.error(error);
      alert('Failed to schedule service.');
    }
  };

  return (
    <motion.div
      className="glass p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-4">Schedule a Service</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="brand" className="block mb-1">
            Machinery Brand
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={e => setBrand(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800"
          />
        </div>
        <div>
          <label htmlFor="model" className="block mb-1">
            Machinery Model
          </label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={e => setModel(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800"
          />
        </div>
        <div>
          <label htmlFor="date" className="block mb-1">
            Appointment Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-green-600 rounded hover:bg-green-700 transition">
          Schedule
        </button>
      </form>
    </motion.div>
  );
};

export default ScheduleService;