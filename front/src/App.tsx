import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Pinfinger from './pages/Pinfinger';
import './App.css';
import Rooms from './pages/Rooms';
import Rockpaperscissor from './pages/Rockpaperscissor';
import useWalletConnect from './hooks/useWalletConnect';
import { WALLET_INITIAL_STATE } from './helpers/apptypes';
import { ellipseAddress } from './helpers/utilities';
import Header from './components/Header';

function App() {
  const { walletState, walletConnectInit, chainUpdate, killSession } =
    useWalletConnect();

  const {
    chain,
    assets,
    address,
    connected,
    fetching,
    showModal,
    pendingSubmissions,
    result,
  } = walletState;

  return (
    <div className="App">
      <Router>
        <div>
          <Header
            connected={connected}
            address={address}
            killSession={killSession}
            chain={chain}
            chainUpdate={chainUpdate}
            walletConnectInit={walletConnectInit}
            assets={assets}
          />
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
