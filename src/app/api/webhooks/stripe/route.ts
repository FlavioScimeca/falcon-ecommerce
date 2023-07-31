import { headers } from 'next/headers';
import Stripe from 'stripe';
import { MongoClient } from 'mongodb';

import { stripe } from '@/libs/stripe';
import { NextResponse } from 'next/server';
import { createOrder, getGamesByIds, updateGameQuantity } from '@/libs/apis';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  if (!signature) {
    console.log('No signature');
    return NextResponse.json({ error: 'No signature' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error: any) {
    console.log(`Webhook signature verification failed`, error.message);
    return NextResponse.json(`Webhook Error: ${error}`, { status: 400 });
  }

  console.log('received', event.type);

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    // Retrieve the subscription details from Stripe.
    // const subscription = await stripe.subscriptions.retrieve(
    //   session.subscription as string
    // );

    console.log({ SESSION: session });

    const line_items = await stripe.checkout.sessions.listLineItems(
      session.id as string,
      {
        expand: ['data.price.product'],
      }
    );

    // const paymentIntentSucceeded = event.data.object;

    const games_slugs_quantities: { item_id: string; quantity: number }[] =
      line_items.data.map((obj: any) => ({
        item_id: obj.price?.product?.metadata?.item_id,
        quantity: obj.quantity,
      }));

    const games = await getGamesByIds(games_slugs_quantities);

    await updateGameQuantity(games);
    await createOrder(games, session.customer_details?.email as string);

    return NextResponse.json('WebHook completed', { status: 200 });
  }

  /*   if (event.type === 'payment_intent.succeeded') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.id as string
    );

    console.log('DATA2', subscription);
  } */

  return NextResponse.json({ received: true });
}
