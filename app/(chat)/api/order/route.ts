import {
  getSession,
  getOrderWithItemsByChatId,
  getOrderWithItemsByOrderId,
} from '@/db/cached-queries';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');
  if (!chatId) {
    return Response.json('Missing chatId', { status: 400 });
  }
  try {
    const user = await getSession();
    if (!user) {
      return Response.json('Unauthorized', { status: 401 });
    }
    const order = await getOrderWithItemsByChatId(chatId);
    return Response.json(order || null, { status: 200 });
  } catch (error) {
    console.error('Error fetching order:', error);
    return Response.json('An error occurred', { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { orderId, status } = await request.json();
  if (!orderId || !status) {
    return Response.json('Missing orderId or status', { status: 400 });
  }
  try {
    const user = await getSession();
    if (!user) {
      return Response.json('Unauthorized', { status: 401 });
    }
    const supabase = await createClient();
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);
    if (error) {
      return Response.json('Failed to update order', { status: 500 });
    }
    // Send order confirmation email when order is submitted
    if (status === 'submitted' && user.email) {
      try {
        // Get the complete order with items for the email
        const order = await getOrderWithItemsByOrderId(orderId);
        if (order && order.items && order.items.length > 0) {
          // Calculate total price
          const totalPrice = order.items.reduce((sum: number, item: any) => {
            return sum + item.price * item.quantity;
          }, 0);
          // Prepare order items for email
          const orderItems = order.items.map((item: any) => ({
            name: item.products?.name || 'Unknown Item',
            quantity: item.quantity,
            price: item.price,
            modifications: item.modifications,
          }));
          // Send the email
          await sendOrderConfirmationEmail({
            customerEmail: user.email,
            customerName:
              user.user_metadata?.full_name || user.email.split('@')[0],
            orderId: order.id,
            orderItems,
            totalPrice,
            orderDate: order.created_at,
          });
        }
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError);
        // Don't fail the order submission if email fails
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating order:', error);
    return Response.json('An error occurred', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { orderItemId } = await request.json();
  console.log('DELETE request received for orderItemId:', orderItemId);

  if (!orderItemId) {
    return Response.json('Missing orderItemId', { status: 400 });
  }
  try {
    const user = await getSession();
    console.log('User session:', user?.id);

    if (!user) {
      return Response.json('Unauthorized', { status: 401 });
    }

    const supabase = await createClient();

    // First, verify the order item belongs to a user's order
    console.log('Fetching order item for verification...');
    const { data: orderItem, error: fetchError } = await supabase
      .from('order_items')
      .select(
        `
        *,
        orders!inner(user_id)
      `
      )
      .eq('id', orderItemId)
      .eq('orders.user_id', user.id)
      .single();

    console.log('Order item fetch result:', { orderItem, fetchError });

    if (fetchError || !orderItem) {
      return Response.json('Order item not found or unauthorized', {
        status: 404,
      });
    }

    // Delete the order item
    console.log('Attempting to delete order item...');
    const { data, error: deleteError } = await supabase
      .from('order_items')
      .delete()
      .eq('id', orderItemId)
      .select();

    console.log('Delete result:', { data, deleteError });

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return Response.json('Failed to remove item from order', { status: 500 });
    }

    console.log('Item deleted successfully');
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error removing item from order:', error);
    return Response.json('An error occurred', { status: 500 });
  }
}
