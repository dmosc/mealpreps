interface OrderConfirmationEmailProps {
  customerName: string;
  orderId: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
    modifications?: any;
  }>;
  totalPrice: number;
  orderDate: string;
}

export const OrderConfirmationEmail: React.FC<
  Readonly<OrderConfirmationEmailProps>
> = ({ customerName, orderId, orderItems, totalPrice, orderDate }) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    }}
  >
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>Order details</h1>
      <p style={{ color: '#666', fontSize: '16px' }}>
        Thank you for placing an order!
      </p>
    </div>
    <div
      style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}
    >
      <h2 style={{ color: '#333', marginBottom: '15px' }}>Details</h2>
      <div style={{ marginBottom: '10px' }}>
        <strong>Order ID:</strong> {orderId}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Order Date:</strong> {new Date(orderDate).toLocaleDateString()}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Customer:</strong> {customerName}
      </div>
    </div>

    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: '#333', marginBottom: '15px' }}>Order Items</h3>
      {orderItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom:
              index < orderItems.length - 1 ? '1px solid #eee' : 'none',
          }}
        >
          <div>
            <div
              style={{ fontWeight: 'bold', color: '#333', marginBottom: '1px' }}
            >
              {item.name}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Qty: {item.quantity} × ${item.price.toFixed(2)}
            </div>
            {item.modifications && (
              <div
                style={{ fontSize: '12px', color: '#888', fontStyle: 'italic' }}
              >
                <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                  {Object.entries(item.modifications).map(([key, value]) => (
                    <li key={key}>
                      {key}: {String(value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div style={{ fontWeight: 'bold', color: '#333' }}>
            ${(item.quantity * item.price).toFixed(2)}
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        borderTop: '2px solid #333',
        paddingTop: '15px',
        textAlign: 'right',
        marginBottom: '30px',
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>

    <div
      style={{
        backgroundColor: '#e8f5e8',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '20px',
      }}
    >
      <p style={{ color: '#2d5a2d', margin: '0', fontWeight: 'bold' }}>
        Your order has been successfully submitted and is being processed.
      </p>
    </div>

    <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
      <p>
        If you have any questions about your order, please contact our support
        team.
      </p>
      <p>Thank you for choosing our service!</p>
    </div>
  </div>
);
