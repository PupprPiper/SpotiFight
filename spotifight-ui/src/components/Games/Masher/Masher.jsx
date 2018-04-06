import React, { Component } from "react";
import ButtonGrid from "./ButtonGrid.jsx";
import Particle from "./particles/Particles.jsx"

import Subheader from "material-ui/List/ListSubheader";
import "./Masher.scss";
import axios from "axios";
import masherHelpers from './masherHelpers.js';
import $ from 'jquery'

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
} from "../../Global/Material-Globals.js";

export default class Masher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localUser: this.props.localUser,
      players: this.props.players,
      socketID: this.props.socketID,
      counter: 10,
      socket: this.props.socket,
      savedResultsToDb: false
    };


  }

  countdown() {
    if (this.state.counter > 0) {
      this.setState({
        counter: (this.state.counter -= 1)
      });
    }
    if (this.state.counter === 0) {
      this.setState({
        counter: (this.state.counter = "GAME OVER")
      });
       $('.btn').prop('disabled', true)
      //this makes it so that only host emits(prevents multiple receiveWinners)
      if (this.props.localUser === this.props.host) {
        this.state.socket.emit("finalScore");
      }
    }
  }

  componentDidUpdate() {
    masherHelpers.animate()
  }

  componentDidMount() {
    $(window).scrollTop(0);
    var id = setInterval(() => this.countdown(), 1000);
    if (this.counter === 0) {
      //nelsons
      clearInterval(id);
    }
    this.state.socket.once("receiveWinner", winner => {
      this.setState({
        counter: (this.state.counter = `${winner[0]} WINS! FINAL SCORE: ${
          winner[1]
        }`)
      });

      if (this.props.localUser === this.props.host && !this.state.savedResultsToDb) {
        this.props.players.forEach(player => {
          if (player.username !== winner[0]) {
            axios.put("/users/addWinLoss", {
              field: "losses",
              user_id: player.id
            });
          } else {
            axios.put("/users/addWinLoss", {
              field: "wins",
              user_id: player.id
            });
          }
        });
        this.setState({savedResultsToDb: true})
      }
    });
  }

  render(props) {
    {
      ("I AM IN MASHER");
    }
    return (
      <div id="masher">

        <div align="center" className="masher-counter masher-animate"  >
          {this.state.counter}
        </div>

        <ButtonGrid players={this.state.players} socket={this.state.socket} />

      </div>
    );
  }
}
