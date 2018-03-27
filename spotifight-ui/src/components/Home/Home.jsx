import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import randomstring from 'randomstring';
import io from 'socket.io-client';
import Button from 'material-ui/Button';
import Masher from '../Games/Masher/Masher';
import { gameSwitch } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MusicTrivia from '../Games/MusicTrivia/MusicTrivia'
import './Home.scss'
import RPSLS from '../Games/RPSLS/rpsls';
import axios from 'axios';
import Verify from '../Auth/Verify.jsx';

import GameList from './GameList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null
    };

  }

  authCheck() {
    const token = localStorage.getItem('token')
    console.log(token);
    axios.post('auth/isLoggedIn', {token: token})
    .then((data) => {
      console.log('auth token has been sent: data back->', data.data)
      if (data.data === 'redirect') {
        this.props.history.push('/login');
      }
    })
  }


  render() {
    return (
      <div>
        <div>Select a game:</div>
        <GameList
          history={this.props.history}
        />
        <Verify />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    game: state.game,
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ gameSwitch }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
