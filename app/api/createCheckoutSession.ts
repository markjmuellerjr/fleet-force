// pages/api/create-checkout-session.ts

import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../lib/stripe';
import { getSession } from 'next-auth/react';
import User from '../../models/User';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Get the user session
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectToDatabase();

  // Find the user in the database
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    // If user doesn't have a Stripe Customer ID, create one
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });

      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // Create a Stripe Checkout Session with a 14-day trial
    const sessionCheckout = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!, // Replace with your price ID
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
      },
      success_url: `${req.headers.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ url: sessionCheckout.url });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}