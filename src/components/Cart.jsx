import React from 'react';
import CartItem from './CartItem'; 

const Cart = ({ cartItems = [], updateQuantity, removeFromCart, onCheckout }) => {
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(3);
  };

  return (
    <div className="cart">
      <div className="cart-title">
        <h2>Keranjang Belanja</h2>
      </div>
      {cartItems.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <div className="cart-items-container">
          <ul>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>
          <div className="cart-total">
            <span>Total:</span>
            <span>{`Rp ${calculateTotal().toLocaleString()}`}</span>
          </div>
          <button onClick={onCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;