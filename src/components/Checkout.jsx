import React, { useState } from 'react';

const Checkout = ({ cartItems, calculateTotal, onDone }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    // Calculate total using the calculateTotal() function
    const total = calculateTotal();

    // Debugging: Log cartItems before filtering
    console.log('Cart items before filtering:', cartItems);

    // Prepare products data with only the required fields
    const filteredProducts = cartItems.map(({ name, price, quantity }) => ({
      name,
      price,
      quantity
    }));

    // Debugging: Log filtered products
    console.log('Filtered products:', filteredProducts);

    const data = {
      name: name,
      phone: phone,
      email: email,
      deliveryOption: deliveryOption,
      paymentMethod: paymentMethod,
      products: filteredProducts,
      total: total,
      ...(deliveryOption === 'delivery' && { address: address }) // Include address only if deliveryOption is 'delivery'
    };
    
    // Debugging: Log data being sent to the backend
    console.log('Data being sent:', data);

    try {
      const response = await fetch('http://localhost:8080/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.message === 'Checkout processed successfully') {
        onDone(); // Notify parent that checkout is done
      } else {
        setMessage('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <div className="checkout-title">
            <h2>Checkout</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Delivery Option:
            <select
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
            >
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </label>
          {deliveryOption === 'delivery' && (
            <label>
              Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          )}
          <label>
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bca">BCA Virtual</option>
              <option value="gopay">GoPay</option>
              <option value="ovo">OVO</option>
            </select>
          </label>
          <button type="submit" disabled={isSubmitting}>Done</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Checkout;
