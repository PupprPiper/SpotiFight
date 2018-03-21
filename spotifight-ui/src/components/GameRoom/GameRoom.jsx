import React, { Component } from "react";
import io from "socket.io-client";
import Lobby from '../Lobby/Lobby.jsx'
import Chat from '../Chat/Chat.jsx'
import Masher from '../Games/Masher/Masher.jsx'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import players from '../Games/Masher/seed.js';
import Grid from "material-ui/Grid";
import Button from "material-ui/Grid";

const games = {
  Masher: Masher
};
export default class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      test: "",
      currRoom: Lobby,
      selectedGame: 'Masher',
      players: players,
      socketID: '',
      localUser: 'MikeUser',
      userImg: 'https://lh3.googleusercontent.com/-tcP7CBn3lpg/Tg15KKkK6pI/AAAAAAAAABQ/Hph0kqR-hKU/w530-h530-n-rw/photo.jpg',
      winner: '',

    };

    this.getWinner = this.getWinner.bind(this);




  }
  async componentWillMount() {
    this.socket = await io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });

  await this.setState({ socket: this.socket });

    this.socket.on('startGameAll', (data)=> {
      this.setState({currRoom: games[this.state.selectedGame]})
    })

    this.state.socket.on('finalScoreObject', (finalScore)=> {
      console.log(finalScore, 'HERE IS THE FINAL SCORE');
    var winner =  this.getWinner(finalScore);
    this.setState({winner: winner})
    this.state.socket.emit('broadcastWinner', winner);
  });

  }

  componentDidUpdate() {



  }

  startGame() {
    this.socket.emit("startGameHost", this.state.selectedGame);
    this.setState({ currRoom: games[this.state.selectedGame] });
  }

  getWinner(final) {
    console.log(final, 'in final score')
      let values = Object.entries(final);
    values = values.sort((a, b)=> {
        return b[1] - a[1];
      })
      console.log(values[0], '<------HERE IS YOUR WINNER')
      return values[0];
  }

  render() {
    return (
      <div>
        <this.state.currRoom socket={this.state.socket}
        userImg={this.state.userImg}
        localUser={this.state.localUser}
        winner = {this.state.winner}
        />
        <Grid container>
          <Grid item md={5}/>
            <Grid item md={2}>
              <Button
                variant="raised"
                color="secondary"
                onClick={() => this.startGame()} >
                START GAME
              </Button>
            </Grid>
            <Grid item md={5}/>
          </Grid>
      </div>
    );
  }
}
