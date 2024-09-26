// components/Hero/Hero.tsx
'use client';

import React from 'react';
import Image from 'next/image';
const Hero: React.FC = () => {
  return (
    <section className="text-center py-20 mt-10">
      <h1 className="text-7xl font-bold text-white mb-4">Welcome to FleetForce</h1>
      <p className="text-2xl text-gray-300 mb-10">
        The ultimate solution for tracking service appointments at heavy machinery dealerships.
      </p>
      <div className="flex justify-center mt-6 space-x-2">
      <Image src="/heroImages/hero-placeholder.png" alt="FleetForce Hero Image" width={1620} height={450} className="flex flex-shrink items-center rounded-2xl shadow-2xl shadow-white/20 transform hover:scale-120 transition-all duration-150 ease-in-out" />
      </div>
    </section>
  );
};
export default Hero;