import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import './App.css';
import Rooms from './pages/Rooms';
import useWalletConnect from './hooks/useWalletConnect';
import Header from './components/Header';
import useMyAlgo from './hooks/useMyAlgo';

function App(): ReactElement {
  const { walletState, walletConnectInit, chainUpdate, killSession } =
    useWalletConnect();

  const myAlgo = useMyAlgo();

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
            myAlgo={myAlgo}
          />
          <Switch>
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
