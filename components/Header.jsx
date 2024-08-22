
import React from 'react';

const Header = ({ setView }) => {
  return (
    <header>
      <nav className="navbar">

        <div className="navbar_brand">
            <h1 className="brand__logo">ARJUNA</h1>
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
