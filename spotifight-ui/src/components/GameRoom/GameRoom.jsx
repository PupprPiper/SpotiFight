import React, { Component } from "react";
import io from "socket.io-client";
import Lobby from '../Lobby/Lobby.jsx'
import Chat from '../Chat/Chat.jsx'
import Masher from '../Games/Masher/Masher.jsx'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import players from '../Games/Masher/seed.js';

const games = {
'Masher': Masher

}
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
  componentDidMount() {


    this.socket = io.connect("http://localhost:8000", {
      query: { roomId: this.props.location.pathname.slice(11) }
    });
    this.setState({ socket: this.socket, socketID: this.socket.id });


    this.socket.on('startGameAll', (data)=> {

      this.setState({currRoom: games[this.state.selectedGame]})
    })
    // this.socket.on("serverMessage", data => {
    //   this.setState({ test: data });
    // });
  }
  startGame() {
    this.socket.emit('startGameHost',
    this.state.selectedGame
    )
  this.setState({currRoom: games[this.state.selectedGame]})

  }
  render() {
    return (
      <div>

       < this.state.currRoom
       localUser={this.state.localUser}
       players={this.state.players}
       socket={this.state.socket}
     userImg={this.state.userImg} />
        <input type="submit" value = 'START' onClick={() => this.startGame()} />
      </div>
    );
  }
}
