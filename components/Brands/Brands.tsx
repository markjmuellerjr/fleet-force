// components/Brands/Brands.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Brand {
  name: string;
  logo: string;
  link: string;
}

const brands: Brand[] = [
  {
    name: 'Caterpillar',
    logo: '/assets/brands/caterpillar.png',
    link: 'https://www.caterpillar.com/',
  },
  {
    name: 'Komatsu',
    logo: '/assets/brands/komatsu.png',
    link: 'https://www.komatsu.com/',
  },
  {
    name: 'John Deere',
    logo: '/assets/brands/john_deere.png',
    link: 'https://www.deere.com/',
  },
  {
    name: 'Bobcat',
    logo: '/assets/brands/volvo.png',
    link: 'https://www.bobcat.com/',
  },
  // Add more brands as needed
];

const Brands: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">Brands We Serve</h2>
        <div className="flex flex-wrap justify-center items-center space-x-6 space-y-6">
          {brands.map((brand, index) => (
            <motion.a
              key={index}
              href={brand.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-64 w-64 rounded-lg shadow-md hover:bg-gray-200 transition glass"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={brand.logo} alt={`${brand.name} Logo`} className="h-10 w-auto object-contain" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;