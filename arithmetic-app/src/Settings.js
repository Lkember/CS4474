import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from './logo.png';
import './App.css';

class Settings extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Settings</h1>
                </header>
                <li><Link to="/GameSelection">BACK</Link></li>
            </div>
        );
    }
}

export default Settings;
