import React from 'react';

const Header = ({ setView, currentView }) => {
  return (
    <header>
      <nav className="navbar">

      <div className="navbar_brand">
          {/* Menyembunyikan logo pada halaman cart dan checkout */}
          {currentView !== 'cart' && currentView !== 'checkout' && (
            <h1 className="brand__logo">ARJUNA</h1>
          )}
      </div>

        <div className="navbar_item">
          <button onClick={() => setView('home')}>Home</button>
          <button onClick={() => setView('cart')}>🛒</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
