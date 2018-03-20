import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import randomstring from "randomstring";
import io from "socket.io-client";
import Button from "material-ui/Button";
import Masher from "../Games/Masher/Masher";
import {gameSwitch} from "../../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = function(state) {
  return {
    game: state.game
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ gameSwitch }, dispatch);
};

const Games = {
  'Masher': Masher
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
  componentDidMount() {}

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
        {Object.keys(Games).map((item, index)=>{
          return <div key = {index}onClick = {()=>{this.handleGameSelect(item)}}> {item} </div>
        })}
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