import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from './logo.png';
import './App.css';

class Division extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">This will hold DIV game</h1>
                </header>
                <li><Link to="/GameSelection">BACK</Link></li>
                <li><Link to="/GameSelection">1</Link></li>
                <li><Link to="/GameSelection">2</Link></li>
                <li><Link to="/GameSelection">3</Link></li>
                <li><Link to="/GameSelection">4</Link></li>
            </div>
        );
    }
}

export default Division;
