// components/Pricing/Pricing.tsx
'use client';

import React from 'react';
import SubscriptionButton from '../SubscriptionButton';

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  priceId: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '$19/month',
    features: ['Real-Time Tracking', 'Automated Notifications'],
    priceId: 'price_basic',
  },
  {
    name: 'Standard',
    price: '$49/month',
    features: ['Real-Time Tracking', 'Automated Notifications', 'Comprehensive Analytics'],
    priceId: 'price_standard',
  },
  {
    name: 'Pro',
    price: '$99/month',
    features: ['All Standard Features', 'Seamless Integration'],
    priceId: 'price_pro',
  },
  {
    name: 'Enterprise',
    price: '$199/month',
    features: ['All Pro Features', 'Dedicated Support', 'Custom Solutions'],
    priceId: 'price_enterprise',
  },
];

const Pricing: React.FC = () => {
  return (
    <section className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col items-stretch justify-items-stretch p-6 dark:bg-gray-800 rounded-lg shadow-md glass"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-300">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4 text-white">{plan.price}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 dark:text-gray-300">
                    <CheckIcon className="h-5 w-5 text-white" />
                    {feature}
                  </li>
                ))}
              </ul>
              <SubscriptionButton priceId={plan.priceId} />
            </div>
          ))}        </div>
      </div>
    </section>
  );
};

// Importing CheckIcon for feature list
import { CheckIcon } from '@heroicons/react/24/solid';

export default Pricing;