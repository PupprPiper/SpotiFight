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

import GameList from './GameList.jsx';
import {Grid} from '../Global/Material-Globals'
import OpenRoomsList from './OpenRoomsList.jsx'
import './Home.scss'
import Carousel from 'nuka-carousel'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      openrooms: [],
    };

  }


  componentWillMount(){
    this.socket = io.connect('http://localhost:8000')
    this.socket.on('OPEN_ROOMS', data =>{

      this.setState({openrooms: data})
    })
  }
  handleRoomSelect(room){
    this.props.history.push({pathname: `/game-room/${room}`})
   
  }
  componentWillUnmount(){
    this.socket.disconnect()
  }


  render() {
    return (
      <div align = 'center' className="top-margin">

        <div>Select a game:</div>

        <GameList
          history={this.props.history}
          align = 'center'
        />
        <div>
          <div align = 'left'> Open Rooms:</div>
            <OpenRoomsList openrooms = {this.state.openrooms}  history={this.props.history}/>
            </div>
        <Verify history={this.props.history} />

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
