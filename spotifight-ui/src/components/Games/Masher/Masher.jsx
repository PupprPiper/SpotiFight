import React, {Component} from 'react';
import ButtonGrid from './ButtonGrid.jsx';

import Subheader from 'material-ui/List/ListSubheader';
import './Masher.scss';


import {
  TextField,
  Drawer,
  AppBar,
  Button,
  List,
  ListItem,
  Toolbar,
  Typography,
  IconButton,
  MenuIcon,
  Grid
} from '../../Global/Material-Globals.js';

export default class Masher extends Component {

  constructor(props) {
    super(props)

    this.state = {
      localUser: this.props.localUser,
      players: this.props.players,
      socketID: this.props.socketID,
      counter: 10,
      socket: this.props.socket

    }



  }



async countdown () {
    if (this.state.counter > 0) {
      this.setState({
        counter: this.state.counter -= 1
      })
    }
    if (this.state.counter===0) {
      this.setState({
        counter: this.state.counter = 'GAME OVER'
      })

        this.state.socket.emit('finalScore');
        console.log(this.props.winner)
        this.state.socket.on('receiveWinner', (winner) => {
          this.setState({
            counter: this.state.counter = `${winner[0]} WINS! FINAL SCORE: ${winner[1]}`
          })
      })



    }
  }

  componentDidMount() {
    var id = setInterval(()=> this.countdown(), 1000);
    if (this.counter === 0) {
      clearInterval(id);
    }

  }

  render(props) {
    {

      'I AM IN MASHER'
    }
    return <div>
    <div align="center" className="flipInY masher-counter">{this.state.counter}</div>
      <ButtonGrid players={this.state.players} socket={this.state.socket}/>
    </div>;
  }
}
