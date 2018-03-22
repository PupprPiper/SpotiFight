import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import randomstring from "randomstring";
import io from "socket.io-client";
import Button from "material-ui/Button";
import Masher from "../Games/Masher/Masher";
import {gameSwitch} from "../../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MusicTrivia from '../Games/MusicTrivia/MusicTrivia'
import './Home.scss'
import RPSLS from '../Games/RPSLS/rpsls'

const mapStateToProps = function(state) {
  return {
    game: state.game,
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ gameSwitch }, dispatch);
};

const Games = {
  'Masher': Masher,
<<<<<<< HEAD
  'MusicTrivia': MusicTrivia
=======
  'RPSLS': RPSLS
>>>>>>> rebasing
};
let randomRoom;
 class Home extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      game: null
    };
    this.handleGameSelect = this.handleGameSelect.bind(this)
  }
  componentDidMount() {
    
  }

  randomRoom() {
    randomRoom = `${randomstring.generate()}`;
  }
  handleGameRoomRedirect() {
    this.randomRoom();

    this.props.history.push({
      pathname: `/game-room/${randomRoom}`,
      state: { game: this.state.game }
    });
  }
  handleGameSelect(item) {
    this.setState({game: item})
    this.props.gameSwitch(item)
    
  }

  render() {
    return (
      <div>
        {console.log(this.props)}
        <div>Select a game:</div>
        
         <div onClick = {()=>{this.handleGameSelect('Masher')}}> <img className = 'column green' src = 'http://www.pvhc.net/img218/nqsltgpugozgfjmxmsec.png'/></div>
         <div onClick = {()=>{this.handleGameSelect('MusicTrivia')}}> <img className = 'column green' src = 'https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png'/></div>
         <div onClick = {()=>{this.handleGameSelect('RPSLS')}}> <img className = 'column green' src = 'http://www.pvhc.net/img218/nqsltgpugozgfjmxmsec.png'/></div>
        
        <Button
          variant="raised"
          color="secondary"
          onClick={() => this.handleGameRoomRedirect()}
        >
          CREATE A NEW GAME ROOM
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);