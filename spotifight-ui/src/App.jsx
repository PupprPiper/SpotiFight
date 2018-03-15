import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
        <BrowserRouter>
          <div>
            <Navbar />
            <Sidebar />
            <Switch>
              <Route path="/" exact component={Home} />;
              <Route path="/chat" component={Chat} />;
              <Route path="/game-room" component={GameRoom} />;
              <Route path="/games" component={Games} />;
              <Route path="/auth" component={Auth} />;
              <Route path="/landing-page" component={LandingPage} />;
              <Route path="/leader-board" component={LeaderBoard} />;
              <Route path="/lobby" component={Lobby} />;
              <Route path="/music-player" component={MusicPlayer} />;
              <Route path="/user-profile" component={UserProfile} />;
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
