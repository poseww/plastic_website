import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Cart from './components/Cart';
import ProductCard from './components/ProductCard';
import Checkout from './components/Checkout';
import myImage from './assets/arjuna.jpg';
import Product1 from './assets/pesriti.jpg';
import Product2 from './assets/plastic2.jpg';
import Product3 from './assets/plastic3.jpg';
import Product4 from './assets/plastic4.jpg';
import Product5 from './assets/plastic5.jpg';
import Product6 from './assets/plastic6.jpg';
import Product7 from './assets/plastic7.jpg';
import Product8 from './assets/plastic8.jpg';
import Product9 from './assets/plastic9.jpg';
import Product10 from './assets/plastic10.jpg';
import Product11 from './assets/plastic11.jpg';
import Product12 from './assets/plastic12.jpg';
import Product13 from './assets/plastic13.jpg';
import Product14 from './assets/plastic14.jpg';
import Product15 from './assets/plastic15.jpg';
import Product16 from './assets/plastic16.jpg';
import './App.css';

const App = () => {
  const [view, setView] = useState(() => localStorage.getItem('view') || 'home');
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [notification, setNotification] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const products = [
    { id: 1, name: 'PE Sriti 4,3 x 20', description: 'Dijual per kilogram. PE ini anti panas dan bisa digunakan untuk membuat esmambo.', price: 35, image: Product1 },
    { id: 2, name: 'PP', description: 'Dijual per kilogram', price: 32, image: Product2 },
    { id: 3, name: 'HD', description: 'per kilogram', price: 32, image: Product3 },
    { id: 4, name: 'PP ikatan 02', description: 'untuk bungkus cabe,  tidak disarankan untuk membungkus kuah, dan yang 02 itu ketebalannya dan ini jualnya per ikat', price: 9, image: Product4 },
    { id: 5, name: 'HD sampah', description: 'per kilogram', price: 22, image: Product5 },
    { id: 6, name: 'PP rol', description: 'per kilogram', price: 32, image: Product6 },
    { id: 7, name: 'PP kaca', description: 'per kilogram, untuk kerupuk', price: 38, image: Product7 },
    { id: 8, name: 'Tali Capung', description: '1 pak', price: 42, image: Product8 },
    { id: 9, name: 'PE 1m', description: '1 pak', price: 42, image: Product9 },
    { id: 10, name: 'Karet', description: '1 pak', price: 42, image: Product10 },
    { id: 11, name: 'karet merah dan hijau', description: '1 pak', price: 42, image: Product11 },
    { id: 12, name: 'Asoy biru dan hijau', description: '1 pak', price: 42, image: Product12 },
    { id: 13, name: 'Asoy lt Pop Ice', description: '1 pak', price: 42, image: Product13 },
    { id: 14, name: 'Kotak Snack', description: '1 pak', price: 42, image: Product14 },
    { id: 15, name: 'Kertas Nasi', description: '1 pak', price: 42, image: Product15 },
    { id: 16, name: 'Mica', description: '1 pak', price: 42, image: Product16 },
  ];

  const handleAddToCart = (product) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item.id === product.id);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + 1
        };
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    setView('checkout');
  };

  const handleCheckoutDone = () => {
    setShowThankYou(true);
    setTimeout(() => {
      setCartItems([]); // Clear the cart after checkout
      setView('home'); // Redirect to home
    }, 3000); // Show thank you message for 3 seconds
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  

  // Filter cart items to include only selected items
  const selectedCartItems = cartItems.filter(item => item.selected);


  return (
    <div>
      <Header setView={setView} currentView={view} />
      {view === 'home' && (
        <div>
          <div className='image-container'>
            <img 
              src={myImage} 
              alt="arjuna" 
              className={view === 'cart' ? 'hide-in-cart' : ''} 
            />
          </div>
          <div className="product-list">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        </div>
      )}
      {view === 'cart' && (
        <div className="cart-wrapper">
          <Cart
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onCheckout={handleCheckout}
          />
        </div>
      )}
      {view === 'checkout' && (
        <div className="checkout-wrapper">
          <Checkout cartItems={cartItems} calculateTotal={calculateTotal} onDone={handleCheckoutDone} />

          {showThankYou && <p className="thank-you">Thank you for shopping at Arjuna!</p>}
        </div>
      )}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default App;
