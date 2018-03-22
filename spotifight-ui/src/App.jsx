import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  MenuIcon,
  Button,
  IconButton,
  ExitToApp
} from './components/Global/Material-Globals';
import axios from 'axios';
import appRoutes from './routes';
import { persistStore } from 'redux-persist';

import AppTitleBar from './components/Global/TitleBar/appTitleBar';
import Sidebar from './components/Global/Sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <AppTitleBar />
            <Sidebar />
            <Switch>
              {appRoutes.map((route, index) => {
                return (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={index}
                  />
                );
              })}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
