import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Navigation />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
