import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App grid-x">
      <div className="cell">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to The Shop</h2>
        </header>
      </div>
    </div>
  );
}

export default App;