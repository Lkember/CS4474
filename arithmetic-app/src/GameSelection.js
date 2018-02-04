import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from './logo.png';
import './App.css';

class GameSelection extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Please choose a game</h1>
                </header>
                <li><Link to="/Multiplication">Multiplication</Link></li>
                <li><Link to="/Division">Division</Link></li>
                <li><Link to="/Factoring">Factoring</Link></li>
                <li><Link to="/Settings">Settings</Link></li>
                <Link to="/">HOME</Link>
            </div>
        );
    }
}

export default GameSelection;
