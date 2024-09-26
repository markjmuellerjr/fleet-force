// components/Features/Features.tsx
'use client';

import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: 'Real-Time Tracking',
    description: 'Monitor service appointments and orders in real-time.',
  },
  {
    title: 'Automated Notifications',
    description: 'Receive timely updates and reminders for upcoming services.',
  },
  {
    title: 'Comprehensive Analytics',
    description: 'Gain insights into service performance and operational efficiency.',
  },
  {
    title: 'Seamless Integration',
    description: 'Easily integrate with existing dealership management systems.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-100 dark:text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 p-6 hover:shadow-xl hover:shadow-white/10 rounded-lg shadow-md glass transform hover:scale-105 transition-all duration-150 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CheckIcon className="h-6 w-6 text-white mt-1" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-100 dark:text-white">{feature.title}</h3>
                <p className="text-gray-300 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}        </div>      
        </div>
    </section>
  );
};

export default Features;