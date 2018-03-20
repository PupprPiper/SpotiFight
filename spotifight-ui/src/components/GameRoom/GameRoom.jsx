import React, { Component } from "react";
import io from "socket.io-client";
<<<<<<< HEAD
import Lobby from "../Lobby/Lobby.jsx";
import Chat from "../Chat/Chat.jsx";
import Masher from "../Games/Masher/Masher.jsx";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
=======
import Lobby from '../Lobby/Lobby.jsx'
import Chat from '../Chat/Chat.jsx'
import Masher from '../Games/Masher/Masher.jsx'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import players from '../Games/Masher/seed.js';
>>>>>>> functional socket game

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
      userImg: 'https://lh3.googleusercontent.com/-tcP7CBn3lpg/Tg15KKkK6pI/AAAAAAAAABQ/Hph0kqR-hKU/w530-h530-n-rw/photo.jpg'

    };

  }
<<<<<<< HEAD
  async componentWillMount() {
    this.socket = await io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });
  await this.setState({ socket: this.socket });
=======
  componentDidMount() {


    this.socket = io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });
    this.setState({ socket: this.socket, socketID: this.socket.id });
>>>>>>> functional socket game


    this.socket.on('startGameAll', (data)=> {

      this.setState({currRoom: games[this.state.selectedGame]})
    })
    // this.socket.on("serverMessage", data => {
    //   this.setState({ test: data });
    // });
  }
  startGame() {
<<<<<<< HEAD
    this.socket.emit("startGameHost", this.state.selectedGame);
    this.setState({ currRoom: games[this.state.selectedGame] });
=======
    this.socket.emit('startGameHost',
    this.state.selectedGame
    )
  this.setState({currRoom: games[this.state.selectedGame]})

>>>>>>> functional socket game
  }
  render() {
    return (
      <div>
        <this.state.currRoom socket={this.state.socket} />
        <Grid container>
          <Grid item md={5}/>

            <Grid item md={2}>
              <Button
                variant="raised"
                color="secondary"
                onClick={() => this.startGame()}
              >
                {" "}
                START GAME
              </Button>
            </Grid>
            <Grid item md={5}/>
          </Grid>

<<<<<<< HEAD
=======
       < this.state.currRoom
       localUser={this.state.localUser}
       players={this.state.players}
       socket={this.state.socket}
     userImg={this.state.userImg} />
        <input type="submit" value = 'START' onClick={() => this.startGame()} />
>>>>>>> functional socket game
      </div>
    );
  }
}
