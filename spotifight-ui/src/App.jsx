import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  red500,
  orange500,
  blue500,
  purple500,
  brown500,
  yellow500
} from 'material-ui/styles/colors';
import { createBrowserHistory } from 'history';

import Navbar from './components/Global/Navbar/navbar';
import Sidebar from './components/Global/Sidebar/Sidebar';
import appRoutes from './routes';

import Auth from './components/Auth/Auth';
import Chat from './components/Chat/Chat';
import GameRoom from './components/GameRoom/GameRoom';
import Games from './components/Games/Games';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Lobby from './components/Lobby/Lobby';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import UserProfile from './components/UserProfile/UserProfile';

const hist = createBrowserHistory();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red500,
    primary2Color: blue500,
    primary3Color: orange500,
    accent1Color: purple500,
    accent2Color: brown500,
    accent3Color: yellow500
  }
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={hist}>
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
        </Router>
      </MuiThemeProvider>
    );
  }
}
