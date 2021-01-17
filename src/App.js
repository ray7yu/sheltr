import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
