import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  console.log('Webhook received');

  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  console.log('Webhook signature:', sig ? 'Present' : 'Missing');
  console.log('Webhook secret configured:', !!endpointSecret);

  let event;

  try {
    if (!endpointSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    console.log('Webhook event verified:', event.type);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('Processing checkout.session.completed event');
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        console.log('Order ID from metadata:', orderId);

        if (orderId) {
          // Update order status to paid
          const { error } = await supabase
            .from('orders')
            .update({
              status: 'paid',
              updated_at: new Date().toISOString(),
            })
            .eq('id', orderId);

          if (error) {
            console.error('Error updating order status:', error);
            return NextResponse.json(
              { error: 'Failed to update order' },
              { status: 500 }
            );
          }

          console.log(`Order ${orderId} marked as paid`);
        } else {
          console.log('No order ID found in session metadata');
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        console.log('Processing payment_intent.payment_failed event');
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata?.orderId;
        console.log('Order ID from payment intent metadata:', orderId);

        if (orderId) {
          // Update order status back to submitted if payment fails
          const { error } = await supabase
            .from('orders')
            .update({
              status: 'submitted',
              updated_at: new Date().toISOString(),
            })
            .eq('id', orderId);

          if (error) {
            console.error('Error updating order status:', error);
          } else {
            console.log(`Order ${orderId} reverted to submitted status`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    console.log('Webhook processed successfully');
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
