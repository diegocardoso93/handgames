import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Pinfinger from './Pinfinger';
import './App.css';
import Rooms from './Rooms';
import Rockpaperscissor from './Rockpaperscissor';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a href="/">
              <img
                src="/img/logo.png"
                style={{ width: 160, marginTop: 24, marginLeft: 10 }}
              />
            </a>
            <button type="button">Connect Wallet</button>
          </div>
          <Switch>
            <Route
              path="/rockpaperscissor/:id?"
              component={Rockpaperscissor}
            ></Route>
            <Route path="/pinfinger/:id?" component={Pinfinger}></Route>
            <Route path="/rooms" component={Rooms}></Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
