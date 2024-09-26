import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const SubscriptionButton = ({ priceId }: { priceId: string }) => {
  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/app/api/createcheckoutsession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      }),
    });

    const { sessionId } = await response.json();
    const { error } = await stripe!.redirectToCheckout({ sessionId });
    if (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="px-3 py-2 bg-white text-gray-900 rounded-md hover:bg-gradient-to-tr hover:from-white hover:to-gray-300 transition"
    >
      14-Day Free Trial
    </button>
  );
};

export default SubscriptionButton;