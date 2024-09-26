// pages/api/webhooks.ts

import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../lib/stripe';
import User from '../../models/User';
import { connectToDatabase } from '../../utils/db';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  await connectToDatabase();

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.mode === 'subscription' && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        const customerId = subscription.customer as string;
        const user = await User.findOne({ stripeCustomerId: customerId });

        if (user) {
          user.stripeSubscriptionId = subscription.id;
          user.subscriptionStatus = subscription.status as any; // 'active', 'trialing', etc.
          if (subscription.trial_end) {
            user.trialEndsAt = new Date(subscription.trial_end * 1000);
          }
          await user.save();
        }
      }

      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;
      const userPayment = await User.findOne({ stripeCustomerId: customerId });

      if (userPayment) {
        userPayment.subscriptionStatus = 'active';
        await userPayment.save();
      }

      break;

    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object as Stripe.Subscription;
      const customerIdDeleted = subscriptionDeleted.customer as string;
      const userDeleted = await User.findOne({ stripeCustomerId: customerIdDeleted });

      if (userDeleted) {
        userDeleted.subscriptionStatus = 'canceled';
        await userDeleted.save();
      }

      break;

    // ... handle other event types

    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}