import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Arithmetic Adventure</h1>
        </header>
          <div>
          <li><Link to="/GameSelection">BEGIN</Link></li>
          </div>
      </div>
    );
  }
}

export default App;
