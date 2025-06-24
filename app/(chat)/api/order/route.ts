import { getSession, getOrderWithItemsByChatId, getOrderWithItemsByOrderId } from '@/db/cached-queries';
import { createClient } from '@/lib/supabase/server';
import { sendOrderConfirmationEmail } from '@/lib/email';

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
            return sum + (item.price * item.quantity);
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
            customerName: user.user_metadata?.full_name || user.email.split('@')[0],
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
