import { getSession, getOrderWithItemsByChatId } from '@/db/cached-queries';
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
    // Optionally, trigger email sending logic here if needed
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating order:', error);
    return Response.json('An error occurred', { status: 500 });
  }
}
