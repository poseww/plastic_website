// import React, { useState } from 'react';

// function CartItem({ item, updateQuantity, removeFromCart }) {
//   const [quantity, setQuantity] = useState(item.quantity || 1);

//   const handleQuantityChange = (event) => {
//     const newQuantity = parseInt(event.target.value, 10);

//     if (isNaN(newQuantity) || newQuantity < 1) {
//       setQuantity(1);
//       updateQuantity(item.id, 1);
//     } else {
//       setQuantity(newQuantity);
//       updateQuantity(item.id, newQuantity);
//     }
//   };

//   return (
//     <div className="cart-item">
//       <img src={item.imageUrl} alt={item.name} />
//       <div className="cart-item-details">
//         <h3>{item.name}</h3>
//         <p>Rp {item.price.toLocaleString()}</p>
//         <div className="quantity-control">
//           <button
//             onClick={() => {
//               const newQuantity = Math.max(1, quantity - 1);
//               setQuantity(newQuantity);
//               updateQuantity(item.id, newQuantity);
//             }}
//             aria-label="Decrease quantity"
//           >
//             -
//           </button>
//           <input
//             type="number"
//             value={quantity}
//             onChange={handleQuantityChange}
//             min="1"
//             aria-label="Quantity"
//           />
//           <button
//             onClick={() => {
//               const newQuantity = quantity + 1;
//               setQuantity(newQuantity);
//               updateQuantity(item.id, newQuantity);
//             }}
//             aria-label="Increase quantity"
//           >
//             +
//           </button>
//         </div>
//         <button onClick={() => removeFromCart(item.id)} aria-label="Remove item">
//           Hapus
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CartItem;

// import React from 'react';

// const CartItem = ({ item, updateQuantity, removeFromCart }) => {
//   const handleQuantityChange = (e) => {
//     const newQuantity = parseInt(e.target.value, 10);
//     updateQuantity(item.id, newQuantity);
//   };

//   return (
//     <li className="cart-item">
//       <img src={item.image} alt={item.name} />
//       <div className="cart-item-details">
//         <h3>{item.name}</h3>
//         <p>Rp {new Intl.NumberFormat('id-ID').format(item.price)} x {item.quantity}</p>

//         <div className="quantity-control">
//           <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
//           <input
//             type="number"
//             value={item.quantity}
//             onChange={handleQuantityChange}
//             min="1"
//           />
//           <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
//         </div>
//         <button onClick={() => removeFromCart(item.id)}>Remove</button>
//       </div>
//     </li>
//   );
// };

// export default CartItem;


import React, { useState } from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  // Initialize state with item's quantity
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    
    if (isNaN(newQuantity) || newQuantity < 1) {
      // Ensure quantity is at least 1
      setQuantity(1);
      updateQuantity(item.id, 1);
    } else {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <li className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)} x {quantity}
        </p>

        <div className="quantity-control">
          <button 
            onClick={() => {
              const newQuantity = Math.max(1, quantity - 1);
              setQuantity(newQuantity);
              updateQuantity(item.id, newQuantity);
            }}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            aria-label="Quantity"
          />
          <button 
            onClick={() => {
              const newQuantity = quantity + 1;
              setQuantity(newQuantity);
              updateQuantity(item.id, newQuantity);
            }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button 
          onClick={() => removeFromCart(item.id)} 
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
