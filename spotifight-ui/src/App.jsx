import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Global/Navbar/navbar';
import Sidebar from './components/Global/Sidebar/Sidebar';
import appRoutes from './routes';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
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
