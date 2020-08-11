import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Switch,
  HashRouter,
  Route
} from "react-router-dom";

import './i18n';
import interestTheme from './theme';

import Footer from './components/footer';
import Home from './components/home';
import Header from './components/header';
import Vaults from './components/pool';


import { injected } from "./stores/connectors";

import {
  CONNECTION_CONNECTED,
} from './constants'

import Store from "./stores";
const emitter = Store.emitter
const store = Store.store

class App extends Component {
  state = {
    headerValue: null
  };

  setHeaderValue = (newValue) => {
    this.setState({ headerValue: newValue })
  };

  componentWillMount() {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        injected.activate()
        .then((a) => {
          store.setStore({ account: { address: a.account }, web3context: { library: { provider: a.provider } } })
          emitter.emit(CONNECTION_CONNECTED)
          console.log(a)
        })
        .catch((e) => {
          console.log(e)
        })
      } else {

      }
    });
  }

  render() {
    const { headerValue } = this.state

    return (
      <MuiThemeProvider theme={ createMuiTheme(interestTheme) }>
        <CssBaseline />
        <HashRouter>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            background: "#f9fafb"
          }}>
            <Switch>
              <Route path="/vaults">
                <Header setHeaderValue={ this.setHeaderValue } headerValue={ headerValue } />
                <Vaults />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            <Footer />
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
