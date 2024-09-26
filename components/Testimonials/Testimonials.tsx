// components/Testimonials/Testimonials.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  position: string;
  company: string;
  feedback: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    position: 'Service Manager',
    company: 'HeavyMachinery Co.',
    feedback: 'FleetForce has revolutionized our service appointment tracking. Highly recommended!',
    image: '/assets/testimonials/john_doe.jpg',
  },
  {
    name: 'Jane Smith',
    position: 'Operations Director',
    company: 'MegaEquip Ltd.',
    feedback: 'The comprehensive analytics provided by FleetForce have significantly improved our operational efficiency.',
    image: '/assets/testimonials/jane_smith.jpg',
  },
  {
    name: 'Mike Johnson',
    position: 'Technician',
    company: 'PowerTools Inc.',
    feedback: 'Automated notifications ensure I never miss an appointment. Great tool for our team!',
    image: '/assets/testimonials/mike_johnson.jpg',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">What Our Clients Say</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="max-w-md p-6 rounded-lg shadow-md glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} Photo`}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">{testimonial.name}</h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">{testimonial.position} at {testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.feedback}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;