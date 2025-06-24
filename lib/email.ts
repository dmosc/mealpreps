import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/components/email/order-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  modifications?: any;
}

export interface SendOrderConfirmationEmailParams {
  customerEmail: string;
  customerName: string;
  orderId: string;
  orderItems: OrderItem[];
  totalPrice: number;
  orderDate: string;
}

export async function sendOrderConfirmationEmail({
  customerEmail,
  customerName,
  orderId,
  orderItems,
  totalPrice,
  orderDate,
}: SendOrderConfirmationEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@updates.mealpreps.co',
      to: [customerEmail],
      subject: `mealpreps order confirmation`,
      react: OrderConfirmationEmail({
        customerName,
        orderId,
        orderItems,
        totalPrice,
        orderDate,
      }),
    });
    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }
    console.log('Order confirmation email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    throw error;
  }
}