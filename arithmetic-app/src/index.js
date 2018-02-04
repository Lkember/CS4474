import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router'

import './index.css';
import App from './App';
import GameSelection from './GameSelection';
import Multiplication from './Multiplication';
import Division from './Division';
import Factoring from './Factoring';
import Settings from './Settings';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router history= {browserHistory}>

        {/*--Path Routes will be inserted here. Try to organize based on function----*/}

        <Route path="/" component={App}/>
        <Route path="/GameSelection" component={GameSelection}/>
        <Route path="/Multiplication" component={Multiplication}/>
        <Route path="/Division" component={Division}/>
        <Route path="/Factoring" component={Factoring}/>
        <Route path="/Settings" component={Settings}/>



    </Router>

), document.getElementById('root'));
registerServiceWorker();
