import { NextRequest, NextResponse } from 'next/server';

import { getSession, getOrderWithItemsByOrderId } from '@/db/cached-queries';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get the order with items
    const order = await getOrderWithItemsByOrderId(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Verify the order belongs to the user
    if (order.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if order has items
    if (!order.items || order.items.length === 0) {
      return NextResponse.json(
        { error: 'Order has no items' },
        { status: 400 }
      );
    }

    // If order is still pending, update it to submitted
    if (order.status === 'pending') {
      const supabase = await createClient();
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'submitted',
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (updateError) {
        console.error('Error updating order status:', updateError);
        return NextResponse.json(
          { error: 'Failed to update order status' },
          { status: 500 }
        );
      }
    }

    // Calculate total amount
    const totalAmount = order.items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Create line items for Stripe
    const lineItems = order.items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.products?.name || 'Unknown Item',
          description: item.products?.description || '',
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${request.nextUrl.origin}/chat/${order.chat_id}?success=true`,
      cancel_url: `${request.nextUrl.origin}/chat/${order.chat_id}?canceled=true`,
      metadata: {
        orderId: order.id,
        chatId: order.chat_id,
        userId: user.id,
      },
      customer_email: user.email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
