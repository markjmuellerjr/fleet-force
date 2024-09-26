import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import SubscriptionButton from '../components/SubscriptionButton';

const Home: React.FC = () => {
  return (
    <Layout>
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
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to FleetForce</h1>
        <p className="text-xl mb-8">
          The ultimate solution for tracking service appointments at heavy machinery dealerships.
        </p>
        <div className="flex justify-center space-x-4">
          {/* Example Subscription Buttons */}
          <SubscriptionButton priceId="price_basic" />
          <SubscriptionButton priceId="price_standard" />
          <SubscriptionButton priceId="price_pro" />
          <SubscriptionButton priceId="price_enterprise" />
        </div>
      </section>
      {/* Add more marketing sections here */}
    </Layout>
  );
};

export default Home;