// app/page.tsx
'use client';

import React from 'react';
import Head from 'next/head';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Pricing from '../components/Pricing/Pricing';
import Testimonials from '../components/Testimonials/Testimonials';
import Brands from '../components/Brands/Brands';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>FleetForce - Manage Your Heavy Machinery Services</title>
        <meta
          name="description"
          content="FleetForce helps heavy machinery dealerships track service appointments, manage orders, and streamline operations."
        />
        <meta name="keywords" content="Heavy Machinery, Service Tracking, Fleet Management, FleetForce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add more meta tags as needed */}
      </Head>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Brands />
      {/* Add more marketing sections here if needed */}
    </>
  );
};

export default Home;