import { getSession, getOrderWithItemsByChatId } from '@/db/cached-queries';

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
