import CartItem from './CartItem'; 

const Cart = ({ cartItems, updateQuantity, removeFromCart, onCheckout }) => {
  return (
    <div className="cart">
      <h2>Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <div>
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
          <button onClick={onCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
